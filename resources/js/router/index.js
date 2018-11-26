import store from '@/store'
import Router from 'vue-router'
import HomePage from '@/pages/Home/Index.vue'
import SitesPage from '@/pages/Sites/Index.vue'
import ServerPage from '@/pages/Server/Index.vue'
import ProfilePage from '@/pages/Profile/Index.vue'
import LoginPage from '@/pages/Auth/Login/Index.vue'
import SignupPage from '@/pages/Auth/Signup/Index.vue'
import AppPage from '@/pages/Sites/Site/App/Index.vue'
import DashboardPage from '@/pages/Dashboard/Index.vue'
import SingleSitePage from '@/pages/Sites/Site/Index.vue'
import ResourcesPage from '@/pages/Server/Resources/Index.vue'
import SingleResourcePage from '@/pages/Server/Resource/Index.vue'
import SourceControl from '@/pages/Profile/SourceControl/Index.vue'
import EnvironmentPage from '@/pages/Sites/Site/Environment/Index.vue'
import ServerProviders from '@/pages/Profile/ServerProviders/Index.vue'
import SocialAuthCallback from '@/pages/Auth/SocialAuthCallback/Index.vue'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth/login',
      name: 'login',
      component: LoginPage,
      meta: {
        noAuth: true
      }
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SignupPage,
      meta: {
        noAuth: true
      }
    },
    {
      path: '',
      name: 'home',
      component: HomePage,
      meta: {
        noAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage
    },
    {
      path: '/servers/:id',
      component: ServerPage,
      children: [
        {
          path: '',
          component: SitesPage
        },
        {
          path: 'sites',
          component: SitesPage
        },
        {
          path: 'resources',
          component: ResourcesPage
        },
        {
          path: 'resources/:resource',
          component: SingleResourcePage
        }
      ]
    },
    {
      path: '/servers/:id/sites/:site',
      component: SingleSitePage,
      children: [
        {
          path: '',
          component: AppPage
        },
        {
          path: 'environment',
          component: EnvironmentPage
        }
      ]
    },
    {
      path: '/user/profile',
      component: ProfilePage,
      children: [
        {
          path: '',
          component: ServerProviders
        },
        {
          path: 'server-providers',
          name: 'server-providers',
          component: ServerProviders
        },
        {
          path: 'source-control',
          name: 'source-control',
          component: SourceControl
        }
      ]
    },
    {
      path: '/auth/:provider/callback',
      name: 'provider-callback',
      component: SocialAuthCallback
    }
  ]
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
        path: '/auth/login'
      })
    }
  }
})

export default router
