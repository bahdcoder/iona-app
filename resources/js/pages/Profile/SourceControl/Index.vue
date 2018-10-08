<template>
  <div>
    <div class="card iona-card">
      <div class="card-header">
        <i class="fab fa-github"></i>
        Github
      </div>
      <div class="card-body">
        <button v-if="github" class="btn btn-success">
          <i class="fa fa-check-circle"></i>
          Connected
        </button>
        <a v-else href='/auth/github' class="btn btn-info">Connect to Github</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('auth', ['user']),
      github() {
        return this.user.config.github
      }
    }
  }
</script>

