function getIPFromInterface(arr){
	var ip = {ip:'127.0.0.1'};
	arr.forEach(function(element){
		if(element['family'] === 'IPv4'){
			ip = {'ip' : element.address};
		}
	})
	return ip;
	
}

exports.getIPFromInterface = getIPFromInterface;