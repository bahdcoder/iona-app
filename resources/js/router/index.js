import store from '@/store'
import Router from 'vue-router'
import HomePage from '@/pages/Home/Index.vue'
import LoginPage from '@/pages/Auth/Login/Index.vue'
import DashboardPage from '@/pages/Dashboard/Index.vue'

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/auth/login',
    name: 'login',
    component: LoginPage,
    meta: {
      noAuth: true,
    },
  }, {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      noAuth: true
    },
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage
  }]
})

const isAuthenticated = () => {
  return store.state.auth.user && store.state.auth.token
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.noAuth)) {
    if (!isAuthenticated()) {
      next()
    } else {
      next()
    }
  } else {
    if (isAuthenticated()) {
      next()
    } else {
      next({
        path: '/auth/login',
      })
    }
  }
})

export default router