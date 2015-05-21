
var mongoose = require('mongoose');
var userUrl = 'mongodb://localhost:27017/myGame';
var model = require('../models/persons.js');
var UserSchema = mongoose.Schemas['Person'];
var db;
var UserMode;


mongoose.connect(userUrl);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Mongoose is connected too');
    //savePerson();
    var body = {
        name: '------------------Vamp3-----------',
        clan: 'Vampires',
        features: 'String',
        hairСolor: 'String',
        beard: 'ng',
        tits: 'Biggg',
        sex: 'Sexxx',
        history : ['hello','Andrey'],
        heroID : 5
    };
    updatePerson(body);


});

savePerson = function(hero) {

    UserMode = db.model('user', UserSchema);

    //var body = {
    //    name: '1111111',
    //    clan: 'Vampires',
    //    features: 'String',
    //    hairСolor: 'String',
    //    beard: 'ng',
    //    tits: 'Biggg',
    //    sex: 'Sexxx',
    //    history : ['hello','Andrey'],
    //    heroID : 0
    //};
    var user = new UserMode(body);

    user.save(function (err, user) {
        if (err) {
            return next(err);
        }

       // console.log(db);
    });
}

updatePerson = function(hero) {

    UserMode = db.model('Persons', UserSchema);

 //UserMode.findOneAndUpdate( {heroID:0}, {$push: {'history': 'Added new line 11111111111111111111111111111111111'} }, {upsert:true}, function(err){
 //       if(err){
 //           console.log(err);
 //       }else{
 //           console.log("Successfully added");
 //       }
 //   });


    UserMode.findOneAndUpdate( {heroID: hero.heroID},hero, {upsert:true}, function(err){
           if(err){
               console.log(err);
           }else{
               console.log("Successfully Updated By Mongoose");
           }
       });


};

findPerson = function(id, socket) {

    UserMode = db.model('Persons', UserSchema);

    UserMode.findOne({ heroID: id }, function (err, doc) {
        socket.emit('showHeroProperty', doc);
        console.log('______________________________________________________',doc);
    })

};

module.exports.findPerson  = findPerson;
module.exports.updatePerson  = updatePerson;