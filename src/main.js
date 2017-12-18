import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
