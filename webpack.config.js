const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

var config = {
  entry: ['babel-polyfill',
    './src/client/js/index.js',
    './src/client/scss/main.scss'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: [/node_modules/],
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'stage-0'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap'
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api/**": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Waves: 'node-waves',
    }),
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    }),
    new CleanWebpackPlugin([outputDirectory]),
  ],
  devtool: 'source-map',
};

module.exports = config;