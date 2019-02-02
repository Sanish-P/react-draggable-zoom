const path = require('path');
const getMode = require('./webpack/mode');
const getModules = require('./webpack/modules');
const getResolve = require('./webpack/resolve');
const getEntryFile = require('./webpack/entry');
const getPlugins = require('./webpack/plugins');
const getOutput = require("./webpack/output");
const getExternals = require("./webpack/externals");
const PUBLIC_PATH = require('./webpack/constants').PUBLIC_PATH;


module.exports = (env = {}) => {
  const { environment = 'development', port = '9000'} = env;
  return {
    mode: getMode(),
    entry: getEntryFile(environment),
    output: getOutput(environment),
    devServer: {
      contentBase: path.resolve(__dirname),
      publicPath: PUBLIC_PATH,
      port: port,
      historyApiFallback: true,
      host: '0.0.0.0' // host for auto open in browser
    },
    module: getModules(),
    externals: getExternals(environment),
    resolve: getResolve(),
    plugins: getPlugins(environment)
  }
}