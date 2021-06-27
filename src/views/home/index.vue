<template>
  <a-layout class="home">
    <a-layout-header>
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :default-selected-keys="[menuData.length]" :style="{ lineHeight: '44px' }">
        <a-menu-item v-for="item in menuData" :key="item.id">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="margin-top: 20px; padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: 'calc(100vh - 135px)' }">
        <free-painting-exhibition />
        <point-exhibition v-if="false" />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import freePaintingExhibition from '../freePaintingExhibition/index.vue'
import pointExhibition from '../pointExhibition/index.vue'
export default {
  components: {
    freePaintingExhibition,
    pointExhibition
  },
  data () {
    return {
      menuData: [
        { id: 2, name: '2.0版本' },
        { id: 1, name: '1.0版本' }
      ]
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.home {
  .ant-layout-header {
    height: 44px;
    line-height: 44px;
    .logo {
      width: 120px;
      height: 21px;
      background: rgba(255, 255, 255, 0.2);
      margin: 12px 24px 0 0;
      float: left;
    }
  }
}
</style>
