/**
 * Created by Roman on 20.04.2015.
 */
var express = require('express');
var app = express();
var app2 = express();
//var http = require('http').Server(app);
//var io = require('socket.io')(app2);

//var myGame = require('./index.js');
var router = require('./routes/routes.js')(app);
var socketRouter = require('./routes/socketRoutes.js').initMap(app2);

app.listen(3030, function() {
    console.log('Server start on port = 3030');
});

//app2.listen(3040, function(){
//    console.log('Socket listening on *:3040');
//});