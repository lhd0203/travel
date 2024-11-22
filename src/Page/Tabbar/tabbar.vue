<template>
  <div>
    <van-tabbar v-model="active" route active-color="#f6da54" inactive-color="#979797">
      <van-tabbar-item icon="home-o" to="/index" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/found" replace>目的地</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/publish" replace>发布</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine" replace>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style scoped>

</style>