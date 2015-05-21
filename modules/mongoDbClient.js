var userUrl = 'mongodb://localhost:27017/myGame';
var MongoClient = require('mongodb').MongoClient;
var PersonsCollection;
var HistoryCollection;

function getTime(){
    var t = new Date();
return t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()+ ' ';
}

// Connect to the db
MongoClient.connect(userUrl, function(err, db) {
    if(!err) {
        // ініціалізація бази, тобто видалення колекцій
        PersonsCollection = db.collection('Persons');
        HistoryCollection = db.collection('PersonsHistory');

        console.log('We are connected to',userUrl);
        console.log('Drop all previos collections');

       PersonsCollection.drop();
       HistoryCollection.drop();

    }
    else console.log('Cant connect to',userUrl);
});

function personsSave(id,text) {
    HistoryCollection.save({owner: id, log: [getTime() + text]});
}

function personsAddLog(id,text) {
    HistoryCollection.update({owner: id},{$push:{log:getTime() + text}});
}


function personsFindLog(id, socket) {

    HistoryCollection.findOne({owner: id}, function(err, item) {
        //console.log(item);
        socket.emit('showLog', item)
    });
}

module.exports.personsSave = personsSave;
module.exports.personsAddLog = personsAddLog;
module.exports.historyLogFindLog = personsFindLog;
