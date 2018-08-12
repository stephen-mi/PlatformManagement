import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import store from './store'
import VueBus from 'vue-bus'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
// import './mock' // simulation data
Vue.use(Vuelidate)
import * as filters from './filters' // global filters
import dialogDom from '@/components/Dialog'
Vue.use(dialogDom)
import searchDialog from '@/components/searchDialog'
Vue.use(searchDialog)

// 父子通信
Vue.prototype.$eventBus = new Vue()

Vue.use(VueBus)
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
