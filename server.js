var express = require('express');
var shell = require('shelljs');
var logger = require('./logger.js');
var exec = require('child_process').exec;

var app = express();


var logger_debug_old = logger.debug;
logger.debug = function (msg) {
    var fileAndLine = traceCaller(1);
    return logger_debug_old.call(this, fileAndLine + " : " + msg);
}

var logger_info_old = logger.info;
logger.info = function (msg) {
    var fileAndLine = traceCaller(1);
    return logger_info_old.call(this, fileAndLine + " : " + msg);
}

var logger_error_old = logger.error;
logger.error = function (msg) {
    var fileAndLine = traceCaller(1);
    return logger_error_old.call(this, fileAndLine + " : " + msg);
}

function traceCaller(n) {
    if (isNaN(n) || n < 0) n = 1;
    n += 1;
    var s = (new Error()).stack,
        a = s.indexOf('\n', 5);
    while (n--) {
        a = s.indexOf('\n', a + 1);
        if (a < 0) {
            a = s.lastIndexOf('\n', s.length);
            break;
        }
    }
    b = s.indexOf('\n', a + 1);
    if (b < 0) b = s.length;
    a = Math.max(s.lastIndexOf(' ', b), s.lastIndexOf('/', b));
    b = s.lastIndexOf(':', b);
    s = s.substring(a + 1, b);
    return s;
}

process.on('uncaughtException', function (err) {
    logger.debug(err);
    if (err.stack) {
        logger.debug(err.stack);
    }
});

app.get('/',function(req,res){
	logger.debug('simple');
res.send('kulwantsingh');
});

app.get('/lock',function(req,res){
	logger.debug('main');
	exec('Rundll32.exe User32.dll,LockWorkStation', function (error, stdout, stderr) {
  // output is in stdout
});

});

app.listen(3001,function(){
console.log("App Started on PORT 3000");
});