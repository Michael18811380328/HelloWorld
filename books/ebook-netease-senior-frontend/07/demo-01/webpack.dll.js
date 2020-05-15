const webpack = require('webpack');
module.exports = {
  entry: {
    vender: ['jquery', 'lodash']
  },
  output: {
    path: __dirname + 'dll',
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: __dirname + 'dll/[name]-manifest.json',
      name: '[name]_library'
    })
  ]
};

// run webpack --config webpack.dll.js
// then set plugins in prod.json

plugins: [
  new webpack.DllReferencePlugin({
    manifest: require('./dll/vender-manifest.js')
  })
],