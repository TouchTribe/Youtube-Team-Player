var express = require('express'),
	path = require('path'),
	app = express(),
	expressWs = require('express-ws')(app),
	r = require('rethinkdb'),
	connection = null,
	wss = null;

var isProduction = process.env.NODE_ENV === 'production',
	port = isProduction ? process.env.PORT : 3000,
	publicPath = path.resolve(__dirname, 'build');


r.connect( {host: 'localhost', port: 28015, 'db': 'teamPlayer'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

app.use(express.static(publicPath));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
	var booty = JSON.parse(msg);
	switch (booty.type) {
		case 'state':
			setState(booty);
			break;
		default:

	}
  });
  console.log('socket', req.testing);
});

wss = expressWs.getWss('/');

app.get('/state/:session_id', function(req, res){
	var session_id = req.params.session_id
	r.table('sessions').filter({
		session_id: session_id
	}).run(connection, function(err, cursor){
		if( err ){
			res.send(err);
		}else {
			var result = cursor.toArray()._settledValue[0];
		 	res.send( result );
		}
	});
});

app.get('/id', function(req, res){
	var id = generateSessionId();
	r.table('sessions').insert({
		session_id: id
	}).run(connection, function(err, result){
		if( err ){
			res.send(err);
		}else {
			res.send({session_id: id});
		}
	});
});

var broadCastMessage = function(msg){
	wss.clients.forEach(function(client) {
		client.send(msg);
	});
};

var setState = function(booty){
	var state = JSON.parse(booty.state);
	console.log('Setting state', state, 'sessionId', state.sessionId );
	r.table('sessions').filter({'session_id': state.sessionId}).update(state).run(connection, function(err, result){
		if( !err ){
			broadCastMessage(JSON.stringify(booty));
		}
	});
};

var generateSessionId = function(){
	return randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

var randomString = function(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
};

app.listen(port, function () {
  console.log('Server running on port ' + port);
});








// Space
