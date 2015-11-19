var exec = require('child_process').exec;
var OS = require('./OSStateFactory.js').OSStateFactory();
var logger = require('./logger.js');

var changeState = {
	'windows' : {
			'lock' : function(){
						exec('Rundll32.exe User32.dll,LockWorkStation', function (error, stdout, stderr) {
									if(error)
									{
										logger.debug(error);
										var dataToSend = {
											'status' : 'fail',
											'msg' : 'error! was not able to run command'
										}
									}
							});
			}
	},
	'linux' : {
	
	}
}

module.exports = changeState[OS];