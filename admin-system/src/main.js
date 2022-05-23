import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "./style/reset.css"

import "./permission"

console.log(router.getRoutes())

/**
 *
 *  rbac :
 *    用户
 *      admin 超级管理员
 *
 *      test 普通管理员
 *
 *
 *    角色
 *
 *      普通管理员     首页 会员管理
 *
 *      超级管理员     首页  会员管理  供应商管理 商品管理  员工管理
 *
 *    权限
 *      首页
 *      会员管理
 *      供应商管理
 *      商品管理
 *      员工管理
 *      
 *
 *
 *
 *
 *
 * */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
