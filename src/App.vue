<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import home from '@/views/home'

export default {
  name: 'App',
  components: {
    home
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
