var express = require('express'),
	path = require('path'),
	app = express();

var isProduction = process.env.NODE_ENV === 'production',
	port = isProduction ? process.env.PORT : 3000,
	publicPath = path.resolve(__dirname, 'build');

// We point to our static assets
app.use(express.static(publicPath));

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});