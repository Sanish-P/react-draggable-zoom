const path = require('path');
const tslintrc = require(path.resolve(__dirname, '../tslint.json'));

module.exports = function generateWebpackModules() {
  return {
    rules: [
      {
        test: /src.*\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              reportFiles: ['src/**/*.{ts,tsx}']
            }
          }
        ]
      },
      {
        test: /src.*\.tsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configuration: tslintrc
            }
          }
        ]
      }, 
      {
        test: /public\/assets\/images.*\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/public/assets/images/',
              output: 'public/assets/images/'
            }
          }
        ]
      }
    ]
  }
}