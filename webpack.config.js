var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-source-map',
  resolve: {
    modulesDirectories: [
      'node_modules'
    ]
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
  ]
};
