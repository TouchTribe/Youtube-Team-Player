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


r.connect( {host: 'localhost', port: 28015, 'db': 'youtubePlayer'}, function(err, conn) {
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
});

wss = expressWs.getWss('/');

app.get('/state/:sessionId', function(req, res){
	var sessionId = req.params.sessionId;
	console.log('/state/',sessionId);
	r.table('sessions').filter({
		sessionId: sessionId
	}).run(connection, function(err, cursor){
		if( err ){
			res.send(err);
		}else {
			cursor.toArray(function(err, result){
				result.forEach(function(row){
					res.send(row);
				})
			});
		}
	});
});

app.get('/id', function(req, res){
	var id = generateSessionId();
	r.table('sessions').insert({
		sessionId: id
	}).run(connection, function(err, result){
		if( err ){
			res.send(err);
		}else {
			res.send({session_id: id});
		}
	});
});

var broadCastMessage = function(msg, sessionId){
	wss.clients.forEach(function(client) {
		if (!sessionId || client.sessionId == sessionId)
			client.send(msg);
	});
};

var setState = function(booty){
	var state = JSON.parse(booty.state);
	console.log('setState:', state);
	r.table('sessions').filter({sessionId: state.sessionId}).update(state).run(connection, function(err, result){
		if( !err ){
			console.log('setState:',result);
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
