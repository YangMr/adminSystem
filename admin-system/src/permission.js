/**
 * @author YangLing
 * @date 2022/5/23 3:59 PM
 */

/**
 * 页面的权限校验
 *  需求： 当用户未登录时,不让访问非登录页面，强行访问应该跳转到登录页面进行登录
 *  实现： 路由守卫的前置钩子函数router.beforeEach
 *
 *  1. 问题： 如何知道用户是否登录？
 *    用户登录之后，后台会返回一个token， 如果本地或者vuex里面有这个token， 说明用户已经登录了， 如果没有，说明未登录
 *
 *  2. 如何在路由守卫中获取token ？  获取本地的还是vuex中？
 *    采用获取vuex中， store.state.token
 *
 *  3. 具体判断的业务流程：
 *      登录
 *        判断访问的是否是登录页
 *          是
 *            返回上一页面
 *
 *          不是 （进入的非登录页面）
 *            判断有没有用户信息
 *                有
 *                  进入目标路由
 *                没有
 *                  重新获取用户信息
 *                    成功
 *                      进入目标路由
 *                    失败
 *                      进入登录页面
 *
 *      未登录
 *
 *        判断访问的是否是登录页
 *          是
 *            进入登录
 *          否
 *            进入登录页
 *
 *
 */

// 引入路由对象
import router from "./router"

// 引入store
import store from "./store"

router.beforeEach(async (to,from,next)=>{
  // 获取token
  const token = store.state.token

  // 判断token是否存储
  if(!token){ // 未登录状态
    // 判断是否进入的是登录页面
    if(to.path === "/login"){
      next()
    }else{
      next("/login")
    }
  }else{ // 登录状态
    // 如果登录了，在访问登录页面
    if(to.path === "/login"){
      // 跳转到登录之前的页面
      next(from.path)
    }else{
      // 如果登录了，访问的非登录页面， 我们需要获取一下用户信息， 如果用户信息存在，则进入目标路由
      const userInfo = store.state.userInfo
      if(userInfo){
        next()
      }else{
        // 如果用户信息不存在, 则重新获取用户信息
        const response = await store.dispatch("getUserInfo")
        // 获取成功
        if(response){
          // 进入要进入的页面
          next()
        }else{
          // 获取失败，进入到登录页
          next("/login")
        }
      }
    }
  }
})
