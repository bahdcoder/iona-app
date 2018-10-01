import store from '@/store'
import Router from 'vue-router'
import HomePage from '@/pages/Home/Index.vue'
import ProfilePage from '@/pages/Profile/Index.vue'
import LoginPage from '@/pages/Auth/Login/Index.vue'
import DashboardPage from '@/pages/Dashboard/Index.vue'
import SourceControl from '@/pages/Profile/SourceControl/Index.vue'
import ServerProviders from '@/pages/Profile/ServerProviders/Index.vue'
import SocialAuthCallback from '@/pages/Auth/SocialAuthCallback/Index.vue'

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
    path: '',
    name: 'home',
    component: HomePage,
    meta: {
      noAuth: true
    },
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage
  }, {
    path: '/user/profile',
    component: ProfilePage,
    children: [{
      path: '',
      component: ServerProviders,
    }, {
      path: 'server-providers',
      name: 'server-providers',
      component: ServerProviders,
    }, {
      path: 'source-control',
      name: 'source-control',
      component: SourceControl,
    }]
  }, {
    path: '/auth/digitalocean/callback',
    name: 'digitalocean-callback',
    component: SocialAuthCallback,
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
      next({
        path: '/dashboard'
      })
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
