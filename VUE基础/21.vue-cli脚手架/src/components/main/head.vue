<template>
    <div>
        <h3>这是 head 组件 === {{ msg }}</h3>
        <async></async>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '123'
    }
  },
  methods: {
  },
  components: {
    async: () => import('./async')
  }
}
</script>

<style scoped>

</style>
