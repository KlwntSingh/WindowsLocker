	var path = require('path')
	var current_dir = path.join(__dirname, 'app', 'server.js')
console.log(current_dir)
     var Service = require('node-windows').Service;
     // Create a new service object
     var svc = new Service({
          name:'WindowsLocker node app',
          description: 'WindowsLocker nodejs app',
          script: current_dir
     });

     // Listen for the "install" event, which indicates the
     // process is available as a service.

     svc.on('install',function(){
                svc.start();
     });

     svc.install();