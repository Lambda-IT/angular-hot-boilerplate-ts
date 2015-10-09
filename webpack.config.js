var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: { main: "./src/app.ts"},
  output: {
    path: path.join(__dirname, 'dist'),
		filename: '[name].js',
  },  
  module: {
    devtool: 'eval',
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts",
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      { test: /\.html$/, loader: "ng-cache?prefix=[dir]/[dir]" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")  },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url-loader?limit=100000" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
			minify: false
		}),
		new webpack.ProvidePlugin({ // jquery, lodash and moment are now globaly available
            $: "jquery",
            jQuery: "jquery",
			_: "lodash",
			moment: "moment"
    }),
    new ExtractTextPlugin("[name].css"),
    new NgAnnotatePlugin({ add: true })    
  ],
  devServer: {
    contentBase: "./src"
  }
};
