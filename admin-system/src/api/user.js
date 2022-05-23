/**
 * @author YangLing
 * @date 2022/5/19 4:08 PM
 */
import request from "../utils/request"

/**
 * 登录接口
 * @param data
 * @returns {AxiosPromise}
 */
const login = (data)=>{
    return request({url : "/v2/admin/login", method : "POST", data})
}

/**
 * 获取用户信息接口
 * @returns {AxiosPromise}
 */
const getUserInfo = ()=>{
  return request({url : "/v2/admin/getUserInfo"})
}

/**
 * 退出登录接口
 * @returns {AxiosPromise}
 */
const logout = ()=>{
  return request({url : "/v2/admin/logout", method : "POST"})
}

export default {
  login,
  getUserInfo,
  logout
}


