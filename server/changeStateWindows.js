var exec = require('child_process').exec;

var changeState = {
	'lock' : function(res){
				exec('Rundll32.exe User32.dll,LockWorkStation', function (error, stdout, stderr) {
							if(error)
							{
								logger.debug(error);
								var dataToSend = {
									'status' : 'fail',
									'msg' : 'error! was not able to run command'
								}
								res.send(dataToSend);
							}
					});
				}
}

module.exports = changeState;