/**
 * @author YangLing
 * @date 2022/5/19 2:23 PM
 */
module.exports = {
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

