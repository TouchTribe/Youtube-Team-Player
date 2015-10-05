var express = require('express'),
	path = require('path'),
	app = express(),
	expressWs = require('express-ws')(app);

var isProduction = process.env.NODE_ENV === 'production',
	port = isProduction ? process.env.PORT : 3000,
	publicPath = path.resolve(__dirname, 'build');

// We point to our static assets
app.use(express.static(publicPath));

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
	var booty = JSON.parse(msg);
	switch (booty.type) {
		case 'track':
			broadCastMessage(msg);
			break;
		default:

	}
  });
  console.log('socket', req.testing);
});

var broadCastMessage = function(msg){
	var wss = expressWs.getWss('/');
	
	wss.clients.forEach(function(client) {
		client.send(msg);
	});
}


// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});
