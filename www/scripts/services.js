var WebSqlAdapter = new function() {

    this.getAllBooks = function(callback) {
        var books = [];

        try {
            db = openDatabase("siloappdb", "1.0", "Silo App DB", 200000);
        } catch (err) {
            alert("Error processing SQL: " + err);
        }
        db.transaction(
            function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY,title,description,updated,lang)");
                tx.executeSql("INSERT OR REPLACE INTO books (id, title, description, lang) VALUES (1,'Book title 1', 'description 1', 'en')");
                tx.executeSql("INSERT OR REPLACE INTO books (id, title, description, lang) VALUES (2,'Libro titolo 2', 'description 2', 'it')");
                tx.executeSql("INSERT OR REPLACE INTO books (id, title, description, lang) VALUES (3,'Libro titulo 3', 'description 3', 'es')");
                tx.executeSql("INSERT OR REPLACE INTO books (id, title, description, lang) VALUES (4,'Book title 4', 'description 4', 'en')");

                var sql = "SELECT * FROM books";

                tx.executeSql(
                    sql,
                    [],
                    function(tx, results) {
                        var len = results.rows.length,
                            i = 0;
                        for (; i < len; i = i + 1) {
                            books[i] = results.rows.item(i);
                        }
                        if (results.rows.length > 0) {
                            //console.log('getAllBooks found books: ' + books.length);
                            callback(books);
                        } else {
                            console.log('getAllBooks error 1: ');
                        }
                    },
                    function(t, e) {
                        console.log("getAllBooks error 2: " + e.message)
                    }
                );
            }
        );
    }

    this.findBookById = function(id, callback) {
        try {
            db = openDatabase("siloappdb", "1.0", "Silo App DB", 200000);
        } catch (err) {
            alert("Error processing SQL: " + err);
        }
        db.transaction(
            function(tx) {
                var sql = "SELECT * FROM books WHERE id=:id";
                tx.executeSql(
                    sql,
                    [id],
                    function(tx, results) {
                        callback(results.rows.length === 1 ? results.rows.item(0) : null);
                    },
                    function(t, e) {
                        console.log("getBook error 1: " + e.message)
                    }
                );
            },
            function(tx, error) {
                console.log("getBook error 2: " + error);
            }
        );
    }
}

angular.module('silo.services', [])

    .factory('BookService', function() {
        var books = [];

        return {
            all: function(callback) {
                WebSqlAdapter.getAllBooks(function(allbooks) {
                    books = allbooks;
                    callback(allbooks);
                });
            },
            get: function(bookId, callback) {
                WebSqlAdapter.findBookById(bookId, function(book) {
                    callback(book);
                });
            }
        }
    })

    .factory('AppService', function() {

        var quotes = ["Andare contro l'evoluzione delle cose è andare contro se stessi.",
            "Quando forzi qualcosa per raggiungere un fine, produci il contrario.",
            "Non opporti ad una grande forza. Retrocedi finché non si indebolisca; allora, avanza con risolutezza.",
            "Le cose stanno bene quando vanno insieme, non quando vanno separate.",
            "Se per te stanno bene il giorno e la notte, l'estate e l'inverno, hai superato le contraddizioni.",
            "Se persegui il piacere, ti incateni alla sofferenza. Ma se non danneggi la tua salute, godi senza inibizioni quando si presenta l'opportunità.",
            "Se persegui un fine, ti incateni. Se tutto ciò che fai, lo fai come un fine in se stesso, ti liberi.",
            "Farai sparire i tuoi conflitti quando li avrai compresi nella loro radice ultima, non quando li vorrai risolvere.",
            "Quando danneggi gli altri, ti incateni. Ma se non danneggi nessuno puoi fare quello che vuoi con libertà.",
            "Quando tratti gli altri come vuoi essere trattato, ti liberi.",
            "Non importa da che parte ti abbiano messo gli eventi, ciò che importa è che tu comprenda di non aver scelto nessuna parte.",
            "Gli atti contraddittori e quelli unitivi si accumulano in te. Se ripeti i tuoi atti di unità interna, niente ti potrà fermare."
        ];

        return {
            appversion: function() {
                return '0.0.1';
            },
            randomQuote: function() {
                return quotes[Math.round(Math.random() * (11))];
            }
        }
    })

    .factory('MediaService', function() {

        var media = [
            { id: 0, title: 'Media 1', description: 'Description media 1' },
            { id: 1, title: 'Media 2', description: 'Description media 2' },
            { id: 2, title: 'Media 3', description: 'Description media 3' },
        ];

        return {
            all: function() {
                return media;
            },
            get: function(bookId) {
                return media[bookId];
            }
        }
    });
