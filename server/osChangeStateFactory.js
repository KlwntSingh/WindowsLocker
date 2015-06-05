
function osChangeStateFactory(){ 
		var os;
		
		if(/^lin/.test(process.platform)) {
				os = 'linux';
		} else if (/^win/.test(process.platform)) {
				os = require('./changeStateWindows.js');
		}
		
		return os;

}


exports.osChangeStateFactory = osChangeStateFactory;