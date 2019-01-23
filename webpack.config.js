const path = require('path');
const getMode = require('./webpack/mode');
const getModules = require('./webpack/modules');
const getResolve = require('./webpack/resolve');
const getEntryFile = require('./webpack/entry');
const getPlugins = require('./webpack/plugins');
const PUBLIC_PATH = require('./webpack/constants').PUBLIC_PATH;


module.exports = (env = {}) => {
  const { environment = 'development', port = '9000'} = env;
  return {
    mode: getMode(environment),
    entry: getEntryFile(),
    output: {
      filename: (() => {
        if (environment === 'prod') {
          return '[name].[hash].js';
        } else {
          return '[name].js';
        }
      })(),
      path: path.resolve(__dirname, 'dist'),
      publicPath: PUBLIC_PATH
    },
    devServer: {
      contentBase: path.resolve(__dirname),
      publicPath: PUBLIC_PATH,
      port: port,
      historyApiFallback: true,
      host: '0.0.0.0' // host for auto open in browser
    },
    module: getModules(),
    resolve: getResolve(),
    plugins: getPlugins()
  }
}