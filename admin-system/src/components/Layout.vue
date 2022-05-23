<template>
  <div class="container">
      <!--头部区域-->
      <app-header></app-header>
      <!--左侧导航区域-->
      <app-navbar></app-navbar>
      <!--右侧主区域-->
      <app-main></app-main>
  </div>
</template>

<script>
import AppHeader from "./AppHeader"
import AppNavbar from "./AppNavbar"
import AppMain from "./AppMain"
export default {
  name: 'Layout',
  components : {
    AppHeader,
    AppNavbar,
    AppMain
  }
};
</script>

<style scoped>
.header{
  height : 50px;
  position: absolute;
  left :0;
  top : 0;
  right : 0;
  background-color: #2d3a4b;
  line-height: 50px;
}
.navbar{
  width: 230px;
  position: absolute;
  left : 0;
  top : 50px;
  bottom : 0;
  background-color: #545c64;
  overflow: auto;
}
.main{
  position: absolute;
  left : 230px;
  right: 0;
  top : 50px;
  bottom : 0;
  overflow: auto;
  padding : 20px;
}
</style>
