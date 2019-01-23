const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = function generateWebpackPlugins() {
  const plugins = [
    new HTMLWebpackPlugin({
      template: './index.html', // copies index to dist
    })
  ]
  return plugins;
};
