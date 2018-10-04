<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Signup</div>

          <div class="card-body">
            <form @submit.prevent="registerUser()">
              <div class="form-group row">
                  <label for="name" class="col-sm-4 col-form-label text-md-right">Full name</label>

                  <div class="col-md-6">
                      <input :class="{ 'is-invalid' : hasErrorsFor('name') }" v-model="name" type="text" class="form-control" placeholder="Enter name" autofocus>
                      <div class="errors" v-if="hasErrorsFor('name')">
                        <span :key="index" v-for="(error, index) in getErrorsFor('name')" class="d-block invalid-feedback">
                          {{ error.message }}
                        </span>
                      </div>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="email" class="col-sm-4 col-form-label text-md-right">Email Address</label>

                  <div class="col-md-6">
                      <input :class="{ 'is-invalid' : hasErrorsFor('email') }" v-model="email" type="email" class="form-control" placeholder="Enter email">
                      <div class="errors" v-if="hasErrorsFor('email')">
                        <span :key="index" v-for="(error, index) in getErrorsFor('email')" class="d-block invalid-feedback">
                          {{ error.message }}
                        </span>
                      </div>
                  </div>
              </div>

              <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                  <div class="col-md-6">
                      <input :class="{ 'is-invalid' : hasErrorsFor('password') }" v-model="password" type="password" class="form-control" placeholder="Enter password">
                      <div class="errors" v-if="hasErrorsFor('password')">
                        <span :key="index" v-for="(error, index) in getErrorsFor('password')" class="d-block invalid-feedback">
                          {{ error.message }}
                        </span>
                      </div>
                  </div>
              </div>

              <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                  <div class="col-md-6">
                      <input v-model="password_confirmation" type="password" class="form-control" placeholder="Enter password confirmation">
                  </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" :disabled="loading" class="btn btn-primary">
                    <Loader v-if="loading" width="14" height="14" /> <span class="ml-2">{{ loading ? 'Signing you up...': 'Sign up' }}</span>
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
  import { mapState, mapGetters } from 'vuex'
  import Loader from '@/components/Loader.vue'
  import { REGISTER_USER } from 'store-modules/auth/constants'

  export default {
    components: {
      Loader,
    },
    data: () => ({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }),
    computed: {
      ...mapState('auth', ['errors', 'loading']),
      ...mapGetters('auth', ['getErrorsFor', 'hasErrorsFor'])
    },
    methods: {
      registerUser() {
        this.$store.dispatch(`auth/${REGISTER_USER}`, {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        }).then(() => this.$router.push('/dashboard'))
      },
    },
  }
</script>
