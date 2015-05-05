/**
 * Created by Roman on 20.04.2015.
 */
var express = require('express');
var app = express();

var myGame = require('./index.js');
var router = require('./routes/routes.js')(app);


app.listen(3030, function() {
    console.log('Server start on port = 3030');
});
