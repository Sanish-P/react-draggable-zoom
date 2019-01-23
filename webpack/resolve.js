const path = require('path');
const getExtensions = require('./extensions');

module.exports = function generateWebpackResolve() {
  return {
    modules: [path.resolve(__dirname, '../'), 'node_modules'],
    extensions: getExtensions()
  }
}
