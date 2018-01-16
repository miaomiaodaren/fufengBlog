var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  //可以在项目中定义<img src>的标签 ，可以不用使用变量图片
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  //css自动补全,此处值
  postcss: [require('autoprefixer')({ browsers: ['last 100 Chrome versions', 'last 50 Firefox versions', 'Safari >= 6', 'ie > 8'] })]
}
