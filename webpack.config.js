const path = require('path');

module.exports = {
  entry: './src/assets/js/main.js',
  devtool: 'source-map',
  devServer: {
    publicPath: "/",
    contentBase: "./dist",
    hot: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/assets/js')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: ['env']
      }
    }]
  }
};
