var conf = require('./conf.js').conf;

var express = require('express');
var bodyParser = require('body-parser');
var random = require('randomstring');

var logger = require('./server/logger.js');
var auth = require('./server/auth.js');
var ChangeState = require('./server/changeState.js');
var networking = require('./server/networking.js');

var sessionToken = random.generate();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", express.static(__dirname + '/client/'));

process.on('uncaughtException', function (err) {
    logger.debug(err);
    if (err.stack) {
        logger.debug(err.stack);
    }
});


app.get('/home',function(req,res){

	logger.debug('home Url Hit');
	logger.debug('request from '+req.connection.remoteAddress);
	
	res.sendFile(__dirname+'/client/home.html');
})

app.get('/getIP',function(req,res){

	logger.debug('request from '+req.connection.remoteAddress);

	var  ip = networking.getCurrentIP();
	res.send(ip);

});

app.get('/authenticate',function(req,res){
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

app.get('/restart',function(req,res){
	logger.debug('changeState Hit');
	logger.debug('change State request from '+req.connection.remoteAddress);
	var dataToSend = {
		'status' : 'fail',
		'msg' : 'you are not authenticated'
	}
	if(true){
		ChangeState.restart(res);
		logger.debug('sytem restart by '+req.connection.remoteAddress);
	}else{
		res.send(dataToSend);
		logger.debug('sytem locked failure by '+req.connection.remoteAddress);
		return;
	}
	dataToSend = {status:'success',msg:'Your system will be restarted'};
	res.send(dataToSend);
  // output is in stdout
});

app.get('/lock',function(req,res){
	logger.debug('changeState Hit');
	logger.debug('change State request from '+req.connection.remoteAddress);
	var dataToSend = {
		'status' : 'fail',
		'msg' : 'you are not authenticated'
	}
	if(true){
		ChangeState.lock(res);
		logger.debug('sytem locked by '+req.connection.remoteAddress);
	}else{
		res.send(dataToSend);
		logger.debug('sytem locked failure by '+req.connection.remoteAddress);
		return;
	}
	dataToSend = {status:'success',msg:'Your system has been locked'};
	res.send(dataToSend);
  // output is in stdout
});

app.get('/flush',function(req,res){
	logger.debug('change IP address to dynamic');
	logger.debug('change IP address request from '+req.connection.remoteAddress);
	var dataToSend = {
		'status' : 'fail',
		'msg' : 'you are not authenticated'
	}
	if(true){
		console.log("here");
		networking.toDynamic(res);
		logger.debug('IP address changed by '+req.connection.remoteAddress);
	}else{
		res.send(dataToSend);
		logger.debug('IP address change failure by '+req.connection.remoteAddress);
		return;
	}
	dataToSend = {status:'success',msg:'Your system IP address changed'};
	res.send(dataToSend);
})


app.listen(conf.port,function(){
	logger.debug('server starts listening');
	console.log("App Started on PORT "+conf.port);
});