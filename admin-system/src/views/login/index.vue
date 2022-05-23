<template>
  <div class="container">
    <div class="center">
      <h3 class="title">星空会员管理系统</h3>

      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="50px">

        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {
      loginForm : {
        username : "",
        password : ""
      },
      rules : {
        username : [
          {required : true, message : "账号不能为空", trigger : "blur"},
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password : [
          {required : true, message : "密码不能为空", trigger : "blur"}
        ]
      }
    }
  },
  methods : {
    handleLoginSubmit(){
      this.$refs["loginForm"].validate(async valid=>{
        if(!valid) return
        const response = await this.$store.dispatch("handleLoginSubmit",this.loginForm)
        if(!response) return

        // const userInfo = await this.$store.dispatch("getUserInfo")
        // if(!userInfo) return

        this.$message.success("登录成功")
        this.$router.push("/")
      })
    }
  }
};
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  background: url("http://vue.mengxuegu.com/img/login.b665435f.jpg") no-repeat;
}
.center{
  width: 350px;
  height: max-content;
  background-color: rgba(255,255,255,0.8);
  position: absolute;
  left : 50%;
  top : 160px;
  margin-left: -175px;
  padding: 28px;
  border-radius: 15px;
}
.title{
  font-size: 26px;
  font-weight: 700;
  text-align: center;
}
.el-form{
  margin-top:40px;
}
</style>
