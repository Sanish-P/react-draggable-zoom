const path = require('path');
const PUBLIC_PATH = require('./constants').PUBLIC_PATH;

module.exports = function getOutput(environment) {
  let output = {
    filename: (() => {
      if (environment === 'production') {
        return 'react-draggable-zoom.js';
      } else {
        return '[name].js';
      }
    })(),
    path: path.resolve(__dirname, '../dist'),
  }
  if(environment === 'production') {
    output = {
      publicPath: PUBLIC_PATH,
      library: 'ReactDraggableZoom',
      libraryTarget: 'umd',
      ...output
    }
  }
  return output
}