import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入element-ui样式文件
import './plugins/elementUI.js'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
//设置baseURL，易错为defaults加s
axios.defaults.baseURL='http://localhost:3001'
Vue.prototype.$http=axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
