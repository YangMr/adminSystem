<template>
  <div class="main">
    <app-link v-show="$route.path !== '/home'"></app-link>
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from "./Link"
export default {
  name: 'index',
  components : {
    AppLink
  }
};
</script>

<style scoped>

</style>
