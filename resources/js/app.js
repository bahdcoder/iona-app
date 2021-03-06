import './bootstrap'
import Vue from 'vue'

import store from './store'
import router from './router'
import Router from 'vue-router'
import Main from './pages/Main.vue'
import Panel from './components/Panel.vue'
import Field from './components/Field.vue'
import Table from './components/Table.vue'
import Loader from './components/Loader.vue'
import IonaButton from './components/Button.vue'
import DynamicNav from './components/DynamicNav.vue'
import PageLoader from './components/PageLoader.vue'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(Router)

Vue.component('field', Field)
Vue.component('panel', Panel)
Vue.component('loader', Loader)
Vue.component('app-table', Table)
Vue.component('dynamic-nav', DynamicNav)
Vue.component('page-loader', PageLoader)
Vue.component('iona-button', IonaButton)

window.vueApp = new Vue({
  el: '#app',
  router,
  store,
  data: {
    ws: window.adonis.Ws().connect()
  },
  components: {
    'main-app': Main
  }
})
