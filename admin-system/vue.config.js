/**
 * @author YangLing
 * @date 2022/5/19 2:23 PM
 */
//个插件可以读取输出文件夹（通常是dist）中的stats.json文件，把该文件可视化展现，生成代码分析报告，可以直观地分析打包出的文件有哪些，及它们的大小、占比情况、各文件 Gzipped 后的大小、模块包含关系、依赖项等，对应做出优化，从而帮助提升代码质量和网站性能
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  configureWebpack : {
    // 配置打包时忽略的一些文件
    // externals : {
    //   vue : "Vue",
    //   "vue-router" : "VueRouter",
    //   vuex : "Vuex",
    //   "element-ui" : "ELEMENT",
    //   lodash : "Lodash"
    // },
    plugins : [
      new BundleAnalyzerPlugin()
    ]
  },
  // 解决打包之后白屏的问题
  publicPath : "./",
  // 配置服务器
  devServer : {
    // 启动的端口号
    port : 9999,
    // 主机名
    host : "localhost",
    // 是否开启https
    https : false,
    // 浏览器自动打开
    open : true,
    // 配置跨域
    proxy : {
      //  "/dev-api" 代理名称， 当我们请求"/dev-api"的时候就相当于请求http://localhost:8888
      // "/pro-api" : {
      [process.env.VUE_APP_BASE_API] : {
        // target 后面写的是要跨域的地址
        target : process.env.VUE_APP_SERVICE_URL,
        // 开启跨域
        changeOrigin : true,
        // 代理路径重写
        pathRewrite : {
          ["^" + process.env.VUE_APP_BASE_API] : ""
        }
      }
    }
  },
  // 关闭eslint代码质量检测
  lintOnSave : false,
  // 配置项目打包时不产生.map后缀名的文件
  productionSourceMap : false
}

