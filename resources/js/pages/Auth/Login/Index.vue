<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>

          <div class="card-body">
            <form @submit.prevent="loginUser()">
              <div class="form-group row">
                  <label for="email" class="col-sm-4 col-form-label text-md-right">Email Address</label>

                  <div class="col-md-6">
                      <input v-model="email" type="email" class="form-control" placeholder="Enter email" required autofocus>
                  </div>
              </div>

              <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                  <div class="col-md-6">
                      <input v-model="password" type="password" class="form-control" placeholder="Enter password" required>
                  </div>
              </div>

              <div class="form-group row" v-if="errors">
                <div class="col-md-4"></div>
                <div class="col-md-6">
                  <span class="text-danger">Invalid credentials.</span>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" :disabled="loading" class="btn btn-primary">
                    <Loader v-if="loading" width="14" height="14" /> <span class="ml-2">{{ loading ? 'Logging in': 'Login' }}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  import { mapState } from 'vuex'
  import Loader from '@/components/Loader.vue'
  import { LOGIN_USER } from 'store-modules/auth/constants'

  export default {
    components: {
      Loader,
    },
    data: () => ({
      email: '',
      password: '',
    }),
    computed: {
      ...mapState({
        errors: state => state.auth.errors,
        loading: state => state.auth.loading
      })
    },
    methods: {
      loginUser() {
        this.$store.dispatch(LOGIN_USER, {
          email: this.email,
          password: this.password,
        }).then(() => this.$router.push('/dashboard'))
      }
    }
  }
</script>
