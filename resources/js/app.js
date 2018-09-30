require('./bootstrap')
import Vue from 'vue'
import store from './store'
import router from './router'
import Router from 'vue-router'
import Main from './pages/Main.vue'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(Router)

new Vue({
  el: '#app',
  router,
  store,
  components: {
    'main-app': Main,
  }
})
