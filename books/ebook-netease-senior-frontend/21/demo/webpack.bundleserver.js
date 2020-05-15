// 大部分配置相同
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

export default {
  entry: {
    app: './src/serve.js'
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? { data: true, map: {inline: false}} : {safe: true}
    }),
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: 'index.ssr.html',
      inject: true,
      files: {
        js: 'app.js'
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunkSortMode: 'dependency'
    }),
    new webpack.HashModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
