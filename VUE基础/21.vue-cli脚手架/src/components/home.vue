<template>
  <div id="app">
    <h1>这是初始组件</h1>
    <router-link to="/head"> head 组件</router-link>
    <router-link to="/body"> body 组件</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
