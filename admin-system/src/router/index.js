import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login';
import Layout from "../components/Layout"

Vue.use(VueRouter);

/**
 * 路由：
 *      写死的路由
 *        1. 所有的子路写到对应的父路由的children属性里面
 *        2. 设置当访问子路由加载父路由，让父路由再加载下面对应的子路由
 *      动态的路由
 *        1. 后台返回对应的路由表
 * @type {[{path: string, component: {data(): {loginForm: {password: string, username: string}, rules: {password: [{trigger: string, message: string, required: boolean}], username: [{trigger: string, message: string, required: boolean},{min: number, max: number, trigger: string, message: string}]}}, methods: {handleLoginSubmit(): void}, name: string}, name: string},{path: string, component: (function(): Promise<{readonly default?: {components: {AppNavbar: {name: string}, AppMain: {name: string}, AppHeader: {computed: {username(): *|string}, methods: {handleCommand(*): void, handleUserLogout(): Promise<void>, handleChangePassword(): void}, name: string}}, name: string}}>), name: string}]}
 */

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path : "/",
    name : "layout",
    redirect : "/home",
    component: Layout,
    children : [
      {
        path : "home",
        name : "home",
        component: () => import("../views/home")
      }
    ]
    // children : [
    //   {
    //     path : "home",
    //     name : "home",
    //     component: () => import("../views/home"),
    //   },
    //   {
    //     path : "member",
    //     name : "member",
    //     component: () => import("../views/member"),
    //   },
    //   {
    //     path : "supplier",
    //     name : "supplier",
    //     component: () => import("../views/supplier"),
    //   },
    //   {
    //     path : "goods",
    //     name : "goods",
    //     component: () => import("../views/goods"),
    //   },
    //   {
    //     path : "staff",
    //     name : "staff",
    //     component: () => import("../views/staff"),
    //   }
    // ]
  },
  {
    path : "/member",
    component : Layout,
    children : [
      {
        path : "/",
        name : "member",
        component : ()=> import("../views/member"),
        meta : {
          title : "会员管理"
        }
      }
    ]
  },
  {
    path : "/supplier",
    component : Layout,
    children : [
      {
        path : "/",
        name : "supplier",
        component : ()=> import("../views/supplier"),
        meta : {
          title : "供应商管理"
        }
      }
    ]
  },
  {
    path : "/goods",
    component : Layout,
    children : [
      {
        path : "/",
        name : "goods",
        component : ()=> import("../views/goods"),
        meta : {
          title : "商品管理"
        }
      }
    ]
  },
  {
    path : "/staff",
    component : Layout,
    children : [
      {
        path : "/",
        name : "staff",
        component : ()=> import("../views/staff"),
        meta : {
          title : "员工管理"
        }
      }
    ]
  },
  {
    path : "/404",
    name : "404",
    component :  ()=> import("../views/404")
  },
  {
    path : "*",
    redirect : "/404"
  }
];

const router = new VueRouter({
  routes,
});

export default router;
