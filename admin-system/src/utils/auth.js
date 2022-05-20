/**
 * @author YangLing
 * @date 2022/5/20 3:41 PM
 */

const TOKEN_KEY = "token"
const USER_INFO_KEY = "userInfo"

// 设置token
export function setToken(token){
  localStorage.setItem(TOKEN_KEY,token)
}

// 设置用户信息
export function setUserInfo(userInfo){
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

// 获取token
export function getToken(){
  return localStorage.getItem(TOKEN_KEY)
}

// 获取用户信息
export function getUserInfo(){
  return JSON.parse(localStorage.getItem(USER_INFO_KEY) || null)
}

// 删除token 与 删除用户信息
export function removeToken(){
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_INFO_KEY)
}

