var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');

var pkg = require("./package.json");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, "src");

module.exports = {
  devtool: 'eval',
  entry: {
    app: "./src/app.ts",
    vendor: Object.keys(pkg.dependencies).concat("./libraries/specific.js")
  },
  resolve: {
    extensions: ["", ".js", ".ts"]
  },
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: "[name].[hash].js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      minify: false
    }),
    new webpack.ProvidePlugin({ // jquery, lodash and moment are now globaly available
      //angular: "angular", // does not work !!
      paper: "paper",
      Rx: "rx",
      $: "jquery",
      jQuery: "jquery",
      _: "lodash",
      moment: "moment"
    }),
    new ExtractTextPlugin("[name].css"),
    new NgAnnotatePlugin({ add: true }),
    new webpack.optimize.CommonsChunkPlugin( // used to bundle common plugins
      "vendor",
      "[name].[hash].js"
      )
  ],
  module: {
    preLoaders: [
      {
        test: /\.ts?$/,
        loader: "tslint-loader",
        include: APP_PATH
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        include: APP_PATH,
        exclude: /node_modules/
      },
      { test: /\.html$/, loader: "ng-cache?prefix=[dir]/[dir]" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url-loader?limit=100000" }
    ]
  },
  tslint: { 
        // tslint errors are displayed by default as warnings 
        // set emitErrors to true to display them as errors 
        emitErrors: false,
 
        // tslint does not interrupt the compilation by default 
        // if you want any file with tslint errors to fail 
        // set failOnHint to true 
        failOnHint: false,       
 
        // name of your formatter (optional) 
        //formatter: "customFormatter",
 
        // path to directory contating formatter (optional) 
        formattersDirectory: "node_modules/tslint-loader/formatters/"
    },
  devServer: {
    contentBase: "./src"
  }
};
