var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    psychic: [
        'x-tag',
        'lodash',
        'webpack-zepto',
        'grapnel',
        'psychic-ui/dist/psychic.css',
        'flux',
        'micro-template',
        'parse'
    ]
  },
  output: {
    filename: '[name].platform.js',
    path: path.resolve(__dirname, 'dll'),
    library: 'psychic',
  },
  
  module: {
        // we're sending all these loaders with this one dev tool install
        loaders: [{
                test: /\.(jpg|png|gif|jpeg)$/,
                loader: "base64-image-loader"
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(html|svg)$/,
                loader: 'html',
                query: {
                    minimize: true
                }
            },
            {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file?name=assets/fonts/[name].[ext]'
            },
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [__dirname + '/node_modules/babel-preset-es2015']
                }
            }
        ],
    },
    plugins: [
    
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
     name: 'psychic',
     path: __dirname + '/dll/psychic-manifest.json',
    })]
};