var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {

    // for now we set one entry for the main package.json entry
    entry: {
        app: ['./src/index.js']
    },

    output: {
        path:path.resolve('./build'),
        filename: "assets/[name].min.js"
    },

    // resolve files
    // we reference a bunch of files in the build tool
    // command dir is the project path
    resolve: {
        extensions: ['.js', '.css'],
        modules: ['./node_modules'],
        alias: {
            'zepto' : 'webpack-zepto',
            'components': __dirname + '/src/components',
            'styles' : __dirname + '/src/styles',
            'store' : __dirname + '/src/store',
            'myApp' : __dirname + '/src/index.js'
        }
    },
    devtool: "source-map",
    module: {
        loaders: [{
                test: /\.(jpg|svg|png|gif|jpeg)$/,
                loader: "base64-image-loader"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(html)$/,
                loader: 'html-loader',
                query: {
                    minimize: true
                }
            },
            {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file?name=assets/fonts/[name].[ext]',
                exclude: /components/
            },
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['babel-preset-es2015']
                }
            }
        ],
    },

    plugins: [
       new webpack.optimize.UglifyJsPlugin(),
            
        new HtmlWebpackPlugin({
            inject: false,
            appMountId: 'app',
            title: 'EZTrack',
            mobile: true,
            template: require('html-webpack-template'),
            links: [
                'https://fonts.googleapis.com/css?family=Lato" rel="stylesheet',
                {rel:'manifest', href:'icons/manifest.json'}         
            ],
            meta: [
                {name: 'mobile-web-app-capable', content:'yes'}
            ]
        }),
        
        // split out framework from app code, faster dev refreshed on HMR
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app.commons',
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules or lib directory
                return module.context && (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('lib') !== -1);
            }
        }),
       
        new FaviconsWebpackPlugin({logo: './src/logo.png', prefix: 'icons/'}),
        
 /*       new AppCachePlugin({
          cache: ['index.html','app.commons.min.js'],
          network: ['app.js'],  // No network access allowed!
          fallback: ['failwhale.jpg'],
          settings: ['prefer-online'],
          exclude: [/.*\.js$/],  // all .js files
          output: 'webmanifest.appcache'
        })
    */
    ],
};