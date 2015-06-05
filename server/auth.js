function checkUser(data){
	var status = false;
	var osUsername = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	if(data.username == osUsername)
		status = true;
	
	return status;
}

function checkAuthentication(data){
	var status = false;
	if(data.originalToken == data.reqToken)
		status = true;
	
	return status;
}

exports.checkUser = checkUser;
exports.checkAuthentication = checkAuthentication;