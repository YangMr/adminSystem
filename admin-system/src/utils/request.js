/**
 * @author YangLing
 * @date 2022/5/19 4:00 PM
 */
// 引入axios
import axios from "axios"

// 创建axios实例对象
const service = axios.create({
  // 请求的公共接口地址， 如果配置了跨域，我们baseURL一般写的是跨域的代理名称
  baseURL : process.env.VUE_APP_BASE_API,
  timeout : 10000
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {

  return config;
}, function (error) {

  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  return Promise.reject(error);
});

// 导出axios实例对象
export default service


