//http://socket.io/get-started/chat/
//http://javascript.ru/forum/events/24215-dobavlenie-ehlementa-v-svg.html
//https://nodesource.com/blog/understanding-socketio

// це не чистий роутер... не получилося розділити правильно черз те що два, потім перероблю
// зараз основна ціль відображення переміщення героя, щоб переконатися що обхід працює корректно

var myGameSocket;
var myDbSocket;
var heroes = require('../index.js');
var historyLog = require('../modules/mongoDbClient.js');
var personsDB = require('../modules/mongooseDBClient.js');

// ініціалізація, створення обектів героїв на карті
function initHeroOnMap (hero,heroNumber) {
    //console.log('Init on map started ')
    if (myGameSocket) {
        myGameSocket.emit("initHero",{'hero':hero, 'heroNumber': heroNumber});
    }
}

function moveHeroOnMap (hero,heroNumber) {
    //  console.log('Move on map started ')
    if (myGameSocket) {
        myGameSocket.emit("moveHero", {'hero': hero, 'heroNumber': heroNumber});
    }
}


// ініціалізація перешкод на карті
//  із ініціалізації карти функція переросла в центральну розподілчу функцію,

function initMap (app) {
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    // var myGame = require('../index.js');
    var myLocation = require('../modules/location.js');




    io.on('connection', function(socket){
        var _fig;
        //myGameSocket = socket;
        //var ID = (socket.id).toString().substr(0, 5);
        //var time = (new Date).toLocaleTimeString();
        //console.log('a batle field connected');

        // фіксуємо вхідне підключення з сторінки ДБ

        socket.on('connectDBUI', function(msg) {
            var _heroes = heroes.heroArray(0);

            myDbSocket = socket;
            console.log('Інтрефейс  DB UI підключено');
            //historyLog.historyLogFindLog(0,socket);
            // personsDB.findPerson(0,socket);
            personsDB.updateHeroList(_heroes.length, socket);

            //console.log('_____',obj);
            //socket.emit('showLog', obj)
        });

        socket.on('getHeroInfo', function(msg) {
            var _heroes = heroes.heroArray(0);
            historyLog.historyLogFindLog(msg,socket);
            personsDB.findPerson(msg,socket);
            personsDB.updateHeroList(_heroes.length, socket);

        });

        socket.on('connectGameUI', function(msg) {
            myGameSocket = socket;
            console.log('Інтрефейс GAME UI підключено');

// Ініціалізація перешкод на батлполі
// трикутники
            for (var i = myLocation.triangle.length - 1; i >= 0; i--) {
                _fig = myLocation.triangle[i];
                myGameSocket.emit("initMap", {
                    'fіgura': 1,
                    "type": _fig.type,
                    "x1": _fig[1].x,
                    "y1": _fig[1].y,
                    "x2": _fig[2].x,
                    "y2": _fig[2].y,
                    "x3": _fig[3].x,
                    "y3": _fig[3].y
                });
            }

            // прямокутники
            for (var i = myLocation.rectangle.length - 1; i >= 0; i--) {
                _fig = myLocation.rectangle[i];
                myGameSocket.emit("initMap", {
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
                });
            }

            // еліпс
            for (var i = myLocation.ellipse.length - 1; i >= 0; i--) {
                _fig = myLocation.ellipse[i];
                myGameSocket.emit("initMap", {
                    'fіgura': 3,
                    'type': _fig.type,
                    'cx': _fig.x,
                    'cy': _fig.y,
                    'rx': _fig.rX,
                    'ry': _fig.rY
                });

            }

// якщо релоад сторінки
            var _heroes = heroes.heroArray(0);

            // console.log(_heroes);
            if (_heroes != 1) {


                for (var i = _heroes.length - 1; i >= 0; i--) {
                    initHeroOnMap(_heroes[i], i);
                }
            }
        });


        socket.on('disconnect', function(){
            if (socket == myGameSocket ){
                myGameSocket = undefined;
                console.log('Game UI is disconnected');
            }

            if (socket == myDbSocket) {
                myDbSocket = undefined;
                console.log('Db UI is disconnected');
            }

        });
    });

    http.listen(3000, function(){
        console.log('Socked listening on *:3000');
    });
}

module.exports.initMap = initMap;
module.exports.initHero = initHeroOnMap;
module.exports.moveHeroOnMap = moveHeroOnMap;
