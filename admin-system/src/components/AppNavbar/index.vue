<template>
  <div class="navbar">

    <el-menu
      :default-active="$route.path"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item v-for="(item,index) in menuList" :key="item.id" :index="item.menu_path">
        <i :class="item.menu_icon"></i>
        <span slot="title">{{item.menu_name}}</span>
      </el-menu-item>
<!--      <el-menu-item index="/member">-->
<!--        <i class="el-icon-user-solid"></i>-->
<!--        <span slot="title">会员管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/supplier">-->
<!--        <i class="el-icon-s-cooperation"></i>-->
<!--        <span slot="title">供应商管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/goods">-->
<!--        <i class="el-icon-s-goods"></i>-->
<!--        <span slot="title">商品管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/staff">-->
<!--        <i class="el-icon-user"></i>-->
<!--        <span slot="title">员工管理</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {
      /**
       * menu菜单的数据在实际开发中， 有两种来源，
       * 1. 后台通过接口返回给前台
       * 2. 前台根据后台返回的路由权限表，动态的生成menu菜单数据，最终实现菜单的动态渲染
       */
      menuList : [
        {
          id : 1,
          menu_path : "/home",
          menu_name : "首页",
          menu_icon : "el-icon-s-home"
        },
        {
          id : 2,
          menu_path : "/member",
          menu_name : "会员管理",
          menu_icon : "el-icon-user-solid"
        },
        {
          id : 3,
          menu_path : "/supplier",
          menu_name : "供应商管理",
          menu_icon : "el-icon-s-cooperation"
        },
        {
          id : 4,
          menu_path : "/goods",
          menu_name : "商品管理",
          menu_icon : "el-icon-s-goods"
        },
        {
          id : 5,
          menu_path : "/staff",
          menu_name : "员工管理",
          menu_icon : "el-icon-user"
        }
      ]
    }
  }
};
</script>

<style scoped>
.el-menu{
  border-right: none;
}
</style>
