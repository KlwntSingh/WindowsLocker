var express = require('express');
var bodyParser = require('body-parser');
var random = require('randomstring');

var logger = require('./server/logger.js');
var auth = require('./server/auth.js');
var osChangeStateFactory = require('./server/osChangeStateFactory.js');
var ChangeState = osChangeStateFactory.osChangeStateFactory();


var sessionToken = random.generate();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

logger.debug('server starts listening');

// base url
app.get('/',function(req,res){
	logger.debug('base Url Hit');
	logger.debug('request from '+req.connection.remoteAddress);
	var data = {
		'username' : req.body.username
	}
	var dataToSend = {
		'token' : ''
	}
	
	if(auth.checkUser(data))
			dataToSend.token = sessionToken;
	
	//token is always sent but if not authenticated just sends empty token
	res.send(dataToSend);
	
});

app.get('/lock',function(req,res){
	logger.debug('changeState Hit');
	logger.debug('change State request from '+req.connection.remoteAddress);
	if(auth.checkAuthentication)
		ChangeState.ChangeState.lock(res);
	else 
	{
		var dataToSend = {
			'status' : 'fail',
			'msg' : 'you are not authenticated'
		}
		res.send(dataToSend);
	}
  // output is in stdout
});


app.listen(1357,function(){
	console.log("App Started on PORT 1357");
});