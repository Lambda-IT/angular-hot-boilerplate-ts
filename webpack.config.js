// this is the dev config file

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.join(__dirname, '/src'), // sets the context path
	entry: './app.js',  // the main app module
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
		//publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
			minify: false
		})
	],
}


