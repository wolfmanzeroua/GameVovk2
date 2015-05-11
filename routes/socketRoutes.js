//http://socket.io/get-started/chat/
//http://javascript.ru/forum/events/24215-dobavlenie-ehlementa-v-svg.html
//https://nodesource.com/blog/understanding-socketio

// це не чистий роутер... не получилося розділити правильно черз те що два, потім перероблю
// зараз основна ціль відображення переміщення героя, щоб переконатися що обхід працює корректно
var mySocket;
var heroes = require('../index.js');

// ініціалізація, створення обектівгероїв
function initHeroOnMap (hero,heroNumber) {
    //console.log('Init on map started ')
    if (mySocket) {
        mySocket.emit("initHero",{'hero':hero, 'heroNumber': heroNumber});
    }
}

function moveHeroOnMap (hero,heroNumber) {
    //  console.log('Move on map started ')
    if (mySocket) {
        mySocket.emit("moveHero", {'hero': hero, 'heroNumber': heroNumber});
    }
}




// ініціалізація перешкод на карті
function initMap (app) {
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

   // var myGame = require('../index.js');
    var myLocation = require('../modules/location.js');


    app.get('/', function(req, res){
        res.sendfile('./postRestAPIandButleField.html');
    });
    app.get('/img/:file', function(req, res){
        res.sendfile('./img/' + req.params.file);
    });

    io.on('connection', function(socket){
        var _fig;
        mySocket = socket;
        //var ID = (socket.id).toString().substr(0, 5);
        //var time = (new Date).toLocaleTimeString();
        console.log('a batlefield.html connected');

// Ініціалізація перешкод на батлполе
// трикутники
        for (var i = myLocation.triangle.length -1; i >=0; i--)
        {
            _fig = myLocation.triangle[i];
            mySocket.emit("initMap", { 'fіgura': 1, "type":_fig.type, "x1" :_fig[1].x, "y1" :_fig[1].y, "x2" :_fig[2].x, "y2" :_fig[2].y,"x3" :_fig[3].x, "y3" :_fig[3].y});
        }

        // прямокутники
        for (var i = myLocation.rectangle.length -1; i >=0; i--)
        {
            _fig = myLocation.rectangle[i];
            mySocket.emit("initMap", { 'fіgura': 2, 'type':_fig.type, 'x1' :_fig[1].x, 'y1' :_fig[1].y, 'x2' :_fig[1].x, 'y2' :_fig[2].y,'x3' :_fig[2].x, 'y3' :_fig[2].y, 'x4' :_fig[2].x, 'y4' :_fig[1].y});
        }

        // еліпс
        for (var i = myLocation.ellipse.length -1; i >=0; i--)
        {
            _fig = myLocation.ellipse[i];
            mySocket.emit("initMap", { 'fіgura': 3, 'type':_fig.type, 'cx' :_fig.x, 'cy' :_fig.y, 'rx' :_fig.rX, 'ry' :_fig.rY});

        }

// якщо релоад сторінки
        var _heroes = heroes.heroArray(0);

       // console.log(_heroes);
        if (_heroes != 1 ) {


            for (var i = _heroes.length - 1; i >= 0; i--) {
                initHeroOnMap(_heroes[i], i);
            }
        }



        socket.on('disconnect', function(){
            console.log(' batlefield.html disconnected');
            mySocket = undefined;
            //clearInterval(interval);

        });
    });

    http.listen(3000, function(){
        console.log('Socked listening on *:3000');
    });
}

module.exports.initMap = initMap;
module.exports.initHero = initHeroOnMap;
module.exports.moveHeroOnMap = moveHeroOnMap;