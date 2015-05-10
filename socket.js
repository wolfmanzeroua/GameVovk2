//http://socket.io/get-started/chat/
//http://javascript.ru/forum/events/24215-dobavlenie-ehlementa-v-svg.html
//https://nodesource.com/blog/understanding-socketio

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var myLocation = require('./modules/location.js');

var mySocket;


app.get('/', function(req, res){
    res.sendfile('./public/battlefield.html');
});

io.on('connection', function(socket){
    var _fig;
    mySocket = socket;
    //var ID = (socket.id).toString().substr(0, 5);
    //var time = (new Date).toLocaleTimeString();
    console.log('a user connected');

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

    // Ініціалізація перешкод на батлполе



    socket.on('disconnect', function(){
        console.log('user disconnected');
        mySocket = undefined;
        //clearInterval(interval);

    });
});

//io.on('connection', function(socket){
//
//    socket.on('chat message', function(msg){
//        console.log('message: ' + msg);
//        io.emit('chat message', msg);
//
//
//    });
//
//});

//var interval = setInterval(function () {
//    //console.log(mySocket);
//    if (mySocket)
//    {
//        var tweet = {user: "nodesource", text: "Hello, world!"};
//        mySocket.emit("tweet", tweet);
//        console.log('Send tweet');
//    }
//}, 2000);




http.listen(3000, function(){
    console.log('listening on *:3000');
});




