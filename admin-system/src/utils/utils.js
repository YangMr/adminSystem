/**
 * @author YangLing
 * @date 2022/5/27 4:21 PM
 */

// loadsh.js  api方法    防抖 节流
// 防抖方法
export function debounce(callback, delay){
  let timer = null
  return function (){
    clearTimeout(timer)
    timer = setTimeout(()=>{
      callback.apply(this,arguments)
    },delay)
  }
}

// 节流方法
export function throttle(callback,wait){
  // 上一次点击的时间
  let lastTime = 0
  return function (){
    // 获取当前点击的时间
    let nowTime = new Date().getTime()
    // 判断当前点击的时候 - 上一次点击的时间 是否 大于 1 秒
    if(nowTime - lastTime > wait){
      callback.apply(this, arguments)
      // 把当前点击的时候 赋值给上一次的时间
      lastTime = nowTime
    }
  }
}


