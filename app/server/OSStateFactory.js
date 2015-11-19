
function OSStateFactory(){ 
		var os;
		
		if(/^lin/.test(process.platform)) {
				os = 'linux';
		} else if (/^win/.test(process.platform)) {
				os = 'windows';
		}
		
		return os;

}


exports.OSStateFactory = OSStateFactory;