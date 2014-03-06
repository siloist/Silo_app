/**
 * Handle Google Maps API V3+
 *  Documentation: https://developers.google.com/maps/documentation/
 */

angular.module('myApp.directives', [])

    .directive("appMap", function($window) {
        return {
            restrict: "E",
            replace: true,
            template: "<div></div>",
            scope: {
                center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
                markers: "=",       // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
                width: "@",         // Map width in pixels.
                height: "@",        // Map height in pixels.
                zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
                mapTypeId: "@",     // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
                panControl: "@",    // Whether to show a pan control on the map.
                zoomControl: "@",   // Whether to show a zoom control on the map.
                scaleControl: "@"   // Whether to show scale control on the map.
            },
            link: function(scope, element, attrs) {
                var toResize, toCenter;
                var map;
                var infowindow;
                var currentMarkers;
                var callbackName = 'InitMapCb';

                // callback when google maps is loaded
                $window[callbackName] = function() {
                    console.log("map: init callback");
                    createMap();
                    updateMarkers();
                };

                if (!$window.google || !$window.google.maps) {
                    console.log("map: not available - load now gmap js");
                    loadGMaps();
                }
                else {
                    console.log("map: IS available - create only map now");
                    createMap();
                }
                function loadGMaps() {
                    console.log("map: start loading js gmaps");
                    var script = $window.document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=InitMapCb';
                    $window.document.body.appendChild(script);
                }

                function createMap() {
                    console.log("map: create map start");
                    var mapOptions = {
                        zoom: 13,
                        center: new google.maps.LatLng(47.55, 7.59),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        panControl: true,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: false,
                        streetViewControl: false,
                        navigationControl: true,
                        disableDefaultUI: true,
                        overviewMapControl: true
                    };
                    if (!(map instanceof google.maps.Map)) {
                        console.log("map: create map now as not already available ");
                        map = new google.maps.Map(element[0], mapOptions);
                        // EDIT Added this and it works on android now
                        // Stop the side bar from dragging when mousedown/tapdown on the map
                        google.maps.event.addDomListener(element[0], 'mousedown', function(e) {
                            e.preventDefault();
                            return false;
                        });
                        infowindow = new google.maps.InfoWindow();
                    }
                }

                scope.$watch('markers', function() {
                    updateMarkers();
                });

                // Info window trigger function
                function onItemClick(pin, label, datum, url) {
                    // Create content
                    var contentString = "Name: " + label + "<br />Time: " + datum;
                    // Replace our Info Window's content and position
                    infowindow.setContent(contentString);
                    infowindow.setPosition(pin.position);
                    infowindow.open(map)
                    google.maps.event.addListener(infowindow, 'closeclick', function() {
                        //console.log("map: info windows close listener triggered ");
                        infowindow.close();
                    });
                }

                function markerCb(marker, member, location) {
                    return function() {
                        //console.log("map: marker listener for " + member.name);
                        var href = "http://maps.apple.com/?q=" + member.lat + "," + member.lon;
                        map.setCenter(location);
                        onItemClick(marker, member.name, member.date, href);
                    };
                }

                // update map markers to match scope marker collection
                function updateMarkers() {
                    if (map && scope.markers) {
                        // create new markers
                        //console.log("map: make markers ");
                        currentMarkers = [];
                        var markers = scope.markers;
                        if (angular.isString(markers)) markers = scope.$eval(scope.markers);
                        for (var i = 0; i < markers.length; i++) {
                            var m = markers[i];
                            var loc = new google.maps.LatLng(m.lat, m.lon);
                            var mm = new google.maps.Marker({ position: loc, map: map, title: m.name });
                            //console.log("map: make marker for " + m.name);
                            google.maps.event.addListener(mm, 'click', markerCb(mm, m, loc));
                            currentMarkers.push(mm);
                        }
                    }
                }

                // convert current location to Google maps location
                function getLocation(loc) {
                    if (loc == null) return new google.maps.LatLng(40, -73);
                    if (angular.isString(loc)) loc = scope.$eval(loc);
                    return new google.maps.LatLng(loc.lat, loc.lon);
                }

            } // end of link:
        }; // end of return
    });
