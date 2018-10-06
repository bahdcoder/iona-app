<template>
  <div class="container">
    <div class="flex-container h-100">
      <Loader dark="true" width="30" height="30" /> <span class="ml-4">Connecting account ....</span> 
    </div>
  </div>
</template>

<script>
  import Loader from '@/components/Loader.vue'
  import { CONNECT_SOCIAL_AUTH } from 'store-modules/auth/constants'

  export default {
    components: {
      Loader,
    },
    mounted() {
      this.connectSocialAuth()
    },
    methods: {
      connectSocialAuth() {
        this.$store.dispatch(`auth/${CONNECT_SOCIAL_AUTH}`, {
          code: this.$route.query.code,
          provider: this.$route.params.provider
        }).then(() => {
          switch (this.$route.params.provider) {
            case 'github':
              return this.$router.push('/user/profile/source-control')
              break;
            case 'digitalocean':
              return this.$router.push('/user/profile')
              break;
            default:
              break;
          }
        })
      }
    }
  }
</script>
