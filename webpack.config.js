const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    fedex: './src/contentscripts/fedex.js',
    ups: './src/contentscripts/ups.js',
    usps: './src/contentscripts/usps.js',
    dhl: './src/contentscripts/dhl.js',
    popup: './src/popup/index.js',
    poll: './src/background/poll.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      ENDPOINT: '',
    }),
  ],
};
