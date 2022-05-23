import Vue from 'vue';
import Vuex from 'vuex';
import {setToken, getToken, setUserInfo, getUserInfo, removeToken} from "../utils/auth"
import User from "../api/user"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token : getToken() || "",
    userInfo : getUserInfo() || null
  },
  mutations: {
    setToken(state,token){
      state.token = token
      setToken(token)
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo
      setUserInfo(userInfo)
    },
    removeToken(state){
      state.token = ""
    },
    removeUserInfo(state){
      state.userInfo = null
    }
  },
  actions: {
    async handleLoginSubmit({commit},payload){
      const response = await User.login(payload)
      if(response){
        commit("setToken",response.token)
      }
      return response
    },
    async getUserInfo({commit}){
      const userInfo = await User.getUserInfo()
      commit("setUserInfo", userInfo)
      return userInfo
    },
    async handleUserLogout({commit}){
      const logout = await User.logout()
      commit("removeToken")
      commit("removeUserInfo")
      removeToken()
      return logout
    }
  },
  modules: {
  },
});
