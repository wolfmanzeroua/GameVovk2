var userUrl = 'mongodb://localhost:27017/myGame';
var MongoClient = require('mongodb').MongoClient;
var PersonsCollection;
var HistoryCollection;
var AvatarCollection;
var DB;

function getTime(){
    var t = new Date();
    return t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()+ ' ';
}

// Connect to the db
MongoClient.connect(userUrl, function(err, db) {
    if(!err) {
        DB = db;
        // ініціалізація бази, тобто видалення колекцій
        PersonsCollection = db.collection('Persons');
        HistoryCollection = db.collection('PersonsHistory');
        AvatarCollection= db.collection('PersonsAvatar');

        console.log('We are connected to',userUrl);
        console.log('Drop all previos collections');

        PersonsCollection.drop();
        HistoryCollection.drop();
        AvatarCollection.drop();

    }
    else console.log('Cant connect to',userUrl);
});

function AvatarSave(id,img) {
    console.log('Save Avatar',id,'IMG'.img)
    AvatarCollection.save({owner: id,avatar: img});
}

function personsSave(id,text) {
    HistoryCollection.save({owner: +id, log: [getTime() + text]});
}

function personsAddLog(id,text) {
    HistoryCollection.update({owner: +id},{$push:{log:getTime() + text}});
}

function personsFindLog(id,res) {

    // console.log('************************************8');
    HistoryCollection.findOne({owner: +id}, function(err, item) {
        if(err){
            console.log(err);
        }
        else {
            console.log('Пошук логів для героя', id, typeof(id), 'знайдено', item);
            res.status(200).send({historyArray: item });

            return { historyArray: item };
        }
    });
}

function GetsAvatars(res) {
    AvatarCollection.find().toArray(function(err, items){

        if(err){
            res.status(406).send({error:err});
        }
        else {
            console.log('Пошук аватарок героїв, знайдено', items);
            res.status(200).send(items);

            return items;
        }
    });
}

function updateAvatars(id, img) {
    console.log('Updating....Avatar',id,img);
    AvatarCollection.update({owner: +id},{$set:{avatar: ""+img}}, function(err, result) {

        if (err) {
            console.log('error: ',err);
        }
        //console.log('result: ',result);
    });
}

module.exports.personsSave = personsSave;
module.exports.personsAddLog = personsAddLog;
module.exports.historyLogFindLog = personsFindLog;
module.exports.AvatarSave = AvatarSave;
module.exports.GetsAvatars = GetsAvatars;
module.exports.updateAvatars = updateAvatars;

