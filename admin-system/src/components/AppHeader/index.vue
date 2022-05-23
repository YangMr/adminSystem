<template>
  <div class="header">
    <router-link to="/">
      <img class="logo" src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="logo" width="25px">
      <span class="company">星空会员管理系统</span>
    </router-link>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="change_password">修改密码</el-dropdown-item>
        <el-dropdown-item command="user_logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'index',
  computed : {
    username(){
      return this.$store.state.userInfo ? this.$store.state.userInfo.username : ""
    }
  },
  methods : {
    handleCommand(command){
      switch (command){
        case "change_password" :
          this.handleChangePassword()
          break;
        case "user_logout" :
          this.handleUserLogout()
          break;
      }
    },
    // 修改密码方法
    handleChangePassword(){
      alert("修改密码")
    },
    // 退出登录方法
    async handleUserLogout(){
      /**
       * 退出登录：
       *  0. 调用退出登录接口，调用成功后
       *  1. 清除本地存储的token
       *  2. 清除vuex的token
       *  3. 清除本地存储的用户信息
       *  4. 清除vuex的用户信息
       *  5. 跳转到登录页
       */
      const logoutMessage =await this.$store.dispatch("handleUserLogout")
      if(!logoutMessage) return
      this.$router.push("/login")
      this.$message.success(logoutMessage)
    }
  }
};
</script>

<style scoped>
.logo{
  vertical-align: middle;
  padding : 0 10px 0 40px;
  position: relative;
  top : -1px;
}
.company{
  color : #fff;
}
.el-dropdown{
  float: right;
  margin-right: 40px;
  color : #fff;
}

</style>
