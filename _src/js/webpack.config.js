const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'main.js'),
  },
  output: {
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader?presets[]=es2015',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: true,
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
  ],
  externals: {
    jquery: 'jQuery',
  },
  resolve: {
    alias: {
    },
  },
};