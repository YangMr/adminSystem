<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item class="line">{{$route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Link'
};
</script>

<style scoped>
.el-breadcrumb{
  padding : 20px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
.line{
  border-left : 3px solid #31c17b;
  padding-left: 10px;
}
</style>
