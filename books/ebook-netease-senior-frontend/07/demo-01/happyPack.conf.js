const happyPack = require('happypack');
const happyThreadPool = happypack.ThreadPool({
  size: os.cpus().length
});

// 常规的配置文件省略
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        {
          loader: 'happypack/loader?id=happypack'
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'happypack/loader?id=happypackscss'
        }
      ]
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loader: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    id: 'happybabelscss',
    loader: ['scss-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  }),
]


// 下面是自定义的插件
a.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('changeStatic', function(compilation) {
    let context = compiler.options.context;
    let publickPath = path.resolve(context, 'dist');
    compilation.toJSON().assets.forEach((ast) => {
      const filePath = path.resolve(publicPath, ast.name);
      fs.readFile(filepath, function(err, file) {
        var newContext = file.toString().replace('./static', 'www.bilibili.com');
        fs.writeFile(filePath, newContext, function() {
          // callback function
        })
      })
    })
  })
}
