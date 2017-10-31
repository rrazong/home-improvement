const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// This will copy all images and css to corresponding folders
const copyWebpackPluginConfig = new CopyWebpackPlugin([
  {
    from: 'public/images',
    to: 'images',
  },
  {
    from: 'public/css',
    to: 'css',
  },
  {
    from: 'public/js',
    to: 'js',
  },
]);

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body', // put the script tag inside the body tag
});

const base = {
  entry: path.join(__dirname, '/src/entry.js'),
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
};

const devMode = {
  devServer: {
    inline: true,
    port: 8080,
  },
  plugins: [
    copyWebpackPluginConfig,
    htmlWebpackPluginConfig,
  ],
};

const productionMode = {
  plugins: [
    copyWebpackPluginConfig,
    htmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;

const config = Object.assign(
  {},
  base,
  LAUNCH_COMMAND === 'deploy'
    ? productionMode
    : devMode,
);

module.exports = config;
