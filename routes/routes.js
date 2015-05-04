var express = require('express');
//var app = express.Router();
var myGame = require('../index.js');

module.exports=function(app){

    app.get('/in*', function(req,res,next){
        res.status(200).send("Hello World!");
        console.log('Hello World!');
       next(); // тест..
    });

    app.get('/info', function (reg, res, next) {
       res.status(200).send('This is Game Server');
       console.log('This is Game Server');

    });

    app.get('/:heroName/:MoveTo/:x/:y', function (req, res, next) {
       res.status(200).send( myGame.setMoveTo(req.params.heroName, +req.params.x, +req.params.y));

    });

    app.get('/:heroName/setToFly/:type', function (req, res, next) {
        res.status(200).send( myGame.setToFly(req.params.heroName, req.params.type));


    });


    app.get('/startGame/', function (req, res, next) {
        res.status(200).send('Game is started');
        myGame.start();
        });



    app.get('/setGameMode/:mode', function (req, res, next) {
        res.status(200).send('Game mode is set to: ' + myGame.gameMode(req.params.mode));
    });


    app.get('/createHero/:name/default/:clan/:x/:y', function (req, res, next) {
        myGame.heroCreate(req.params.name, req.params.clan, +req.params.x, +req.params.y);
        console.log(req.params.name, req.params.clan, req.params.x, req.params.y);
        res.status(200).send(req.params.name + ' is created, and number of heroes: ' + myGame.numberOfHero(0) );

        // res.redirect(301, 'http://google.com');
        // console.log(req.params.xx);
    });

    app.get('/get/numberOfLivingHero/', function (req, res, next) {
        //  res.status(200).send("<script>window.parent.deliver("+ myGame.numberOfLivingHero +")</script>" + "10");
        res.status(200).send(" "+ myGame.numberOfLivingHero(0));
        //console.log('відповів',    myGame.numberOfLivingHero(0));
        // res.redirect(301, 'http://google.com');
        // console.log(req.params.xx);

    });
    app.get('/:heroName/setFreeze/:status', function (req, res, next) {
        res.status(200).send(myGame.freezeHero(req.params.heroName,req.params.status));
    });


};

