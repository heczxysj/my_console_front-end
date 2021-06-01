import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
// 把axios挂在到原型上 这样vue的所有实例都可以通过this调用axios this.$http.get('url', data)
Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
