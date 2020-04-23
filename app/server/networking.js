var exec = require('child_process').exec;
var osprop = require('os');
var OS = require('./OSStateFactory.js').OSStateFactory();
var util = require('./util.js');
var logger = require('./logger.js');

var changeState = {
	'windows' : {
			'toDynamic' : function(){
						console.log();
						exec('netsh int ipv4 set address name="Wi-Fi" source="dhcp"', function (error, stdout, stderr) {
									if(error){
										logger.debug(error);
										var dataToSend = {
											'status' : 'fail',
											'msg' : 'error! was not able to run command'
										}
									}
							});
			},
			'getCurrentIP' : function(){
							var ifacess = osprop.networkInterfaces();
							return ifacess;
			}
	},
	'linux' : {
	
	}
}

module.exports = changeState[OS];

