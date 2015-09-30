var 
  path = require('path'),
  merge = require('webpack-merge'),
  webpack = require('webpack'),
  TARGET = process.env.TARGET,
  ROOT_PATH = path.resolve(__dirname),
  HtmlWebpackPlugin = require('html-webpack-plugin');

var common = {

  entry: [path.resolve(ROOT_PATH, 'app/main')],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Spotify Team Player'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?stage=1'],
        include: path.resolve(ROOT_PATH, 'app')
      },

      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
};

switch (TARGET) {
  case 'build':
    module.exports = merge(common, {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ]
    });

    break;

  case 'dev':
    module.exports = merge(common, {
      entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server'
      ]
    });
    break;
}
