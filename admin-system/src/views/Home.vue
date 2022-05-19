<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="handleSend">发送请求</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import User from "../api/user"
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  methods : {
   async handleSend(){
      // .then .catch .all .race promise独有的方法
     const res = await User.login({username:"admin", password : "admin"})
     console.log(res)
    }
  }
};
</script>
