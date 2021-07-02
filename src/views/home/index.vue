<template>
  <a-layout class="home">
    <a-layout-header>

    </a-layout-header>
    <a-layout-content style="margin-top: 20px; padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: 'calc(100vh - 135px)' }">
        <free-painting type="line" width="500" height="500" />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import freePainting from '@/components/freePainting'
export default {
  components: {
    freePainting,
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
