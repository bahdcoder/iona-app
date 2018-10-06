<template>
  <nav class="navbar navbar-expand-lg px-0 navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="">Iona</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/dashboard" class="nav-link">Servers</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active dropdown" v-if="authenticated">
            <a class="nav-link dropdown-toggle" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ user.name }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link to='/user/profile' class="dropdown-item" href="">My Account</router-link>
              <a @click.prevent="logoutUser()" class="dropdown-item" href="">Logout</a>
            </div>
          </li>
          <li class="nav-item active">
            <router-link to='/auth/signup' class="nav-link" v-if="!authenticated">
              Sign up
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link to='/auth/login' class="nav-link" v-if="!authenticated">
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'
  import { LOGOUT_USER } from 'store-modules/auth/constants'

  export default {
    computed: {
      ...mapState('auth', ['user', 'authenticated']),
    },
    methods: {
      logoutUser() {
        this.$store.dispatch(`auth/${LOGOUT_USER}`)
            .then(() => this.$router.push('/'))
      }
    }
  }
</script>

