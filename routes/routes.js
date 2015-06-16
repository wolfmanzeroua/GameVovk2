var express = require('express');
//var app = express.Router();
var myGame = require('../index.js');
var bodyparser = require('body-parser');
var historyLog = require('../modules/mongoDbClient.js');
var myLocation = require('../modules/location.js');




module.exports = function(app) {

    app.use(bodyparser.json());
    //app.use(bodyparser.urlencoded({extended: true}));

    app.post('/createHero/', function(req, res, next) {
        var body = req.body;
        var gameResponse = myGame.heroCreate(body);

        console.log('POST: /createHero/', body);


        if ('err' in gameResponse) {
            res.status(406).send(gameResponse.err)
        }
        else {
            res.status(200).send(gameResponse);
        }
    });

    app.patch('/createHero/:id', function(req, res, next) {
        var body = req.body;
        var id = req.params.id;
        var gameResponse = myGame.newSettings(body);

        console.log('PATCH: /createHero/'+id, body);


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

    app.get('/heroesHistory/:id', function (req, res, next) {
        //console.dir(req.params.id);
        historyLog.historyLogFindLog(req.params.id, res);
        // res.status(200).send({text:'Hello World'});

    });

    app.get('/obstacles/', function (req, res, next) {
        var obstacles=[];
        var obstaclesCount=0;
        var _fig;
        //console.dir(req.params.id);
        //historyLog.historyLogFindLog(req.params.id, res);
        // res.status(200).send({text:'Hello World'});
        for (var i = myLocation.triangle.length - 1; i >= 0; i--) {
            _fig = myLocation.triangle[i];
            obstacles[obstaclesCount] = {
                'fіgura': 1,
                "type": _fig.type,
                "x1": _fig[1].x,
                "y1": _fig[1].y,
                "x2": _fig[2].x,
                "y2": _fig[2].y,
                "x3": _fig[3].x,
                "y3": _fig[3].y
            };
            obstaclesCount++;
        }

        // прямокутники
        for (var i = myLocation.rectangle.length - 1; i >= 0; i--) {
            _fig = myLocation.rectangle[i];
            obstacles[obstaclesCount] = {
                'fіgura': 2,
                'type': _fig.type,
                'x1': _fig[1].x,
                'y1': _fig[1].y,
                'x2': _fig[1].x,
                'y2': _fig[2].y,
                'x3': _fig[2].x,
                'y3': _fig[2].y,
                'x4': _fig[2].x,
                'y4': _fig[1].y
            };
            obstaclesCount++;
        }

        // еліпс
        for (var i = myLocation.ellipse.length - 1; i >= 0; i--) {
            _fig = myLocation.ellipse[i];
            obstacles[obstaclesCount] =  {
                'fіgura': 3,
                'type': _fig.type,
                'cx': _fig.x,
                'cy': _fig.y,
                'rx': _fig.rX,
                'ry': _fig.rY
            };
            obstaclesCount++;
        }
console.log(obstacles);
 res.status(200).send({array: obstacles});
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
