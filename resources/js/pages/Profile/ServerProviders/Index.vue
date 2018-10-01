<template>
  <div>
    <div class="card iona-card">
      <div class="card-header">
        <i class="fab fa-digital-ocean"></i>
        Digital Ocean
      </div>
      <div class="card-body">
        
        <button v-if="digitalocean" class="btn btn-success">
          <i class="fa fa-check-circle"></i>
          Connected
        </button>
        <a href='/auth/digitalocean'
          class="btn btn-info"
          v-else>
          Connect to Digital Ocean
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        digitalocean: state => state.auth.user.config.digitalocean
      })
    }
  }
</script>

