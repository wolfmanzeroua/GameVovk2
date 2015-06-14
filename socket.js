//http://socket.io/get-started/chat/
//http://javascript.ru/forum/events/24215-dobavlenie-ehlementa-v-svg.html
//https://nodesource.com/blog/understanding-socketio

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var historyLog = require('./modules/mongoDbClient.js');
var persons = require('./modules/mongooseDBClient.js');

//var myLocation = require('./modules/location.js');


var mySocket;
var myGameSocket;
var myDbSocket;



//app.get('/', function(req, res){
//    // res.sendfile('./public/battlefield.html');
//    res.sendfile('./dataBaseUI.html');
//});
//
//app.get('/img/:file', function(req, res){
//    res.sendfile('./img/' + req.params.file);
//});

io.on('connection', function(socket) {
    mySocket = socket;

    var ID = (socket.id).toString().substr(0, 15);
    var time = (new Date).toLocaleTimeString();
    // console.log('a user connected', ID);

    socket.on('connectDBUI', function(msg) {
        myDbSocket = socket;
        console.log('Інтреіейс БД підключено');
        var obj = historyLog.historyLogFindLog(0,socket);
        var obj2 = persons.findPerson(1,socket);
       // var obj2 = persons.findPerson(1,socket);
        //console.log('_____',obj);
        //socket.emit('showLog', obj)
    });

    socket.on('connectGameUI', function(msg) {
        myGameSocket = socket;
        console.log('Інтреіейс БД підключено');




// Ініціалізація перешкод на батлполе
// трикутники
//    for (var i = myLocation.triangle.length -1; i >=0; i--)
//    {
//        _fig = myLocation.triangle[i];
//        myGameSocket; .emit("initMap", { 'fіgura': 1, "type":_fig.type, "x1" :_fig[1].x, "y1" :_fig[1].y, "x2" :_fig[2].x, "y2" :_fig[2].y,"x3" :_fig[3].x, "y3" :_fig[3].y});
//    }
//
//    // прямокутники
//    for (var i = myLocation.rectangle.length -1; i >=0; i--)
//    {
//        _fig = myLocation.rectangle[i];
//        myGameSocket; .emit("initMap", { 'fіgura': 2, 'type':_fig.type, 'x1' :_fig[1].x, 'y1' :_fig[1].y, 'x2' :_fig[1].x, 'y2' :_fig[2].y,'x3' :_fig[2].x, 'y3' :_fig[2].y, 'x4' :_fig[2].x, 'y4' :_fig[1].y});
//    }
//
//    // еліпс
//    for (var i = myLocation.ellipse.length -1; i >=0; i--)
//    {
//        _fig = myLocation.ellipse[i];
//        myGameSocket; .emit("initMap", { 'fіgura': 3, 'type':_fig.type, 'cx' :_fig.x, 'cy' :_fig.y, 'rx' :_fig.rX, 'ry' :_fig.rY});
//
//    }
//
//    // Ініціалізація перешкод на батлполе
//
//
//
    });


    socket.on('disconnect', function(){
        if (socket == myGameSocket )
        {
            myGameSocket = undefined;
            console.log('Game Ui a disconnected');
        }

        if (socket == myDbSocket )
        {
            myDbSocket = undefined;
            console.log('Db UI a disconnected');
        }

        // myGameSocket;  = undefined;
        //clearInterval(interval);

    });
//});

//io.on('connection', function(socket){
//
//    socket.on('chat message', function(msg){
//        console.log('message: ' + msg);
//        io.emit('chat message', msg);
//
//
//    });
//
});



//var interval = setInterval(function () {
//    //console.log(myGameSocket; );
//    if (myGameSocket; )
//    {
//        var tweet = {user: "nodesource", text: "Hello, world!"};
//        myGameSocket; .emit("tweet", tweet);
//        console.log('Send tweet');
//    }
//}, 2000);



http.listen(3000, function(){
    console.log('listening on *:3000');
});




