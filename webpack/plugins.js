const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = function generateWebpackPlugins(environment) {
  const plugins = []
  if(environment === 'development') {
    plugins.push(
      new HTMLWebpackPlugin({
        template: './index.html', // copies index to dist
      })
    )
  }
  return plugins;
};
