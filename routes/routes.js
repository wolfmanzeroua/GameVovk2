var express = require('express');
//var app = express.Router();
var myGame = require('../index.js');
var bodyparser = require('body-parser');




module.exports = function(app) {

    app.use(bodyparser.json());
    //app.use(bodyparser.urlencoded({extended: true}));

    app.post('/createHero/', function(req, res, next) {
        var body = req.body;
        var gameResponse = {};
        //var body = req.body;
        console.log('POST: /createHero/', body);
        // console.log(body.name, body.clan, +body.x, +body.y);

        gameResponse = myGame.heroCreate(body);

        if ('err' in gameResponse) {
            res.status(406).send(gameResponse.err)
        }
        else {
            res.status(200).send(gameResponse);
        }
    });
        app.post('/setGamePlay/', function (req, res, next) {
            var body = req.body;
            console.dir(body);

            if ('startGame' in body) {
                res.status(200).send({text:'Game is started'});
                 myGame.start();
            }

            if ('typeOfGame' in body) {
                res.status(200).send({text: 'Game mode is set to: ' + myGame.gameMode(body.typeOfGame)});
            }

            if ('timeBetweenSteps' in body) {
                res.status(200).send({text: 'timeBetweenSteps is set to' + myGame.setTimeBetweenSteps(+body.timeBetweenSteps)});
            }

        });

    app.get('/heroes/', function (req, res, next) {
        //console.dir(body);
        res.status(200).send( myGame.heroArray(0));

    });





    //  app.use(bodyparser.json());

    //app.use(bodyparser.urlencoded({extended: true}));
    //
    //app.get('/in*', function (req, res, next) {
    //    res.status(200).send("Hello World!");
    //    console.log('Hello World!');
    //    next(); // тест..
    //});
    //
    //app.get('/info', function (reg, res, next) {
    //    res.status(200).send('This is Game Server');
    //    console.log('This is Game Server');
    //});
    //
    //app.get('/:heroName/:MoveTo/:x/:y', function (req, res, next) {
    //    res.status(200).send(myGame.setMoveTo(req.params.heroName, +req.params.x, +req.params.y));
    //
    //});
    //
    //app.get('/:heroName/setToFly/:type', function (req, res, next) {
    //    res.status(200).send(myGame.setToFly(req.params.heroName, req.params.type));
    //});
    //
    //
    //app.get('/startGame/', function (req, res, next) {
    //    res.status(200).send('Game is started');
    //    myGame.start(function(){});
    //});
    //
    //app.get('/setGameMode/:mode', function (req, res, next) {
    //    res.status(200).send('Game mode is set to: ' + myGame.gameMode(req.params.mode));
    //});
    //
    //
    //app.get('/createHero/:name/default/:clan/:x/:y', function (req, res, next) {
    //    myGame.heroCreate(req.params.name, req.params.clan, +req.params.x, +req.params.y);
    //    console.log(req.params.name, req.params.clan, req.params.x, req.params.y);
    //    res.status(200).send(req.params.name + ' is created, and number of heroes: ' + myGame.numberOfHero(0));
    //
    //
    //});
    //
    //app.get('/get/numberOfLivingHero/', function (req, res, next) {
    //
    //    res.status(200).send(" " + myGame.numberOfLivingHero(0));
    //
    //
    //});
    //app.get('/:heroName/setFreeze/:status', function (req, res, next) {
    //    res.status(200).send(myGame.freezeHero(req.params.heroName, req.params.status));
    //});
    //
    //app.post('/createHero/', function (req, res, next) {
    //    var body = req.body;
    //    console.log(body);
    //    console.log(body.name, body.clan, +body.x, +body.y);
    //    res.status(200).send(myGame.heroCreate(body.name, body.clan, +body.x, +body.y));
    //
    //
    //       });
    //
    //app.post('/setHero/', function (req, res, next) {
    //    var body = req.body;
    //    console.dir(body);
    //    //myGame.heroCreate(body.name);
    //    //console.log(body.name, body.clan, +body.x, +body.y);
    //    res.status(200).send(myGame.newSettings(body));
    //});
    //
    //app.post('/setGameMode/', function (req, res, next) {
    //    var body = req.body;
    //    console.dir(body);
    //    res.status(200).send('Game mode is set to: ' + myGame.gameMode(body.typeOfGame));
    //
    //});
    //
    //app.post('/startGame/', function (req, res, next) {
    //    var body = req.body;
    //    console.dir(body);
    //    res.status(200).send('Game is started');
    //    myGame.start();
    //});
    //
    //app.post('/setGame/', function (req, res, next) {
    //    var body = req.body;
    //    console.dir(body);
    //    res.status(200).send(myGame.setTimeBetweenSteps(+body.timeBetweenSteps));
    //
    //});

};
