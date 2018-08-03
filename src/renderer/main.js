import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import dbUtils from './db.js'
var VueAsyncData = require('vue-async-data')


import Buefy from 'buefy'
Vue.use(Buefy, {defaultIconPack: 'fa'})


import daterangepicker from 'daterangepicker';
window.moment = require('moment');
Vue.use(VueAsyncData)
Vue.config.silent = true

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
