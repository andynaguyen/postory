const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    fedex: './src/contentscripts/fedex.js',
    popup: './src/popup/app.js',
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
