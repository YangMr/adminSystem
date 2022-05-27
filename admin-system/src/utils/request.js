/**
 * @author YangLing
 * @date 2022/5/19 4:00 PM
 */

// 引入axios
import axios from "axios"

// 引入vuex
import store from "../store"

// 导出message提示组件
import { Message } from 'element-ui'

// 引入auth
import {removeToken} from "./auth"

// 引入router
import router from "../router"

// 引入loading
import { Loading } from 'element-ui'


// 设计模式 :  单例模式
const loading = {
  // 保存的是Loading的实例对象
  loadingInstance : null,
  // 打开loading加载
  open(){
   // loading加载没有开启的时候，我们则可以开启loading加载
   if(this.loadingInstance === null){
     this.loadingInstance = Loading.service({
       target : '.main',
       text : "正在拼命加载中.....",
       background : "rgba(0,0,0,0.5)"
     });
   }
  },
  // 关闭loading加载
  close(){
    if(this.loadingInstance !== null){
      // loading加载开启的时候，我们则可以关闭loading加载
      this.loadingInstance.close()
      this.loadingInstance = null
    }
  }
}

// 创建axios实例对象
const service = axios.create({
  // 请求的公共接口地址， 如果配置了跨域，我们baseURL一般写的是跨域的代理名称
  baseURL : process.env.VUE_APP_BASE_API,
  timeout : 10000
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 开启loading加载
  loading.open()

  // 将token通过请求头发送给后台
  const token = store.state.token
  if(token){
    config.headers.authorization = "Bearer " +  token
  }
  return config;
}, function (error) {
  // 关闭loading加载
  loading.close()

  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 关闭loading加载
  loading.close()

  // 请求成功的处理
  if(response.data.code === 1){
    return response.data.data
  }

  if(response.data.error_code === 0){
    return response.data.msg
  }

  // token过期处理
  if(response.data.code === -1){
    // 清空vuex里面的token和用户信息
    store.commit("removeToken","")
    store.commit("removeUserInfo","")
    // 清空本地的token和用户信息
    removeToken()
    // 跳转到登录页
    router.push("/login")
  }

  // 错误信息提示
  _showErrorMessage(response.data.message)

}, function (error) {
  // 关闭loading加载
  loading.close()

  return Promise.reject(error);
});

// 错误信息提示方法
function _showErrorMessage(msg){
  const message = msg || "发生未知错误"
  Message({message, type : "error", duration : 1000})
}

// 处理get请求方式的参数问题
function request(options){
  options.method = options.method || "get"
  if(options.method.toLowerCase() === 'get'){
     options.params = options.data
  }
  return service(options)
}


// 导出axios实例对象
export default request

