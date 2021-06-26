import Vue from 'vue'
import App from './App.vue'
import antDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/style/index.less'

Vue.config.productionTip = false

Vue.use(antDesignVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
