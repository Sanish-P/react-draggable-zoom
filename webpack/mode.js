module.exports = function generateWebpackMode(environment) {
  if (environment === 'prod') {
    return 'production';
  } else {
    return 'development';
  }
};