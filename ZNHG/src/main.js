// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index';
import store from './store'
import 'normalize.css/normalize.css';// normalize.css 样式格式化
import element from  'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import './styles/index.scss' // global css
import VueClipboard from 'vue-clipboard2'
import './icons' // icon
import './permission' // permission control
import  '../src/store/modules/premission'
Vue.use(element,{locale})
Vue.use(VueClipboard)
//注入路由规则

Vue.config.productionTip = false
//Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
