<template>
  <div>
    <page-loader v-if="singleSiteLoading" />
    <page heading="Site details" :routes="routes" v-else />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Page from '@/components/Page'
  import { GET_SITE } from 'store-modules/sites/constants'

  export default {
    mounted() {
      this.getSite()
    },
    components: {
      Page,
    },
    computed: {
      ...mapState('sites', ['singleSiteLoading']),
      routes() {
        return [{
          name: 'App',
          icon: 'fas fa-box-open',
          link: `/servers/${this.$route.params.id}/sites/${this.$route.params.site}`
        }, {
          name: 'Environment',
          icon: 'fas fa-cannabis',
          link: `/servers/${this.$route.params.id}/sites/${this.$route.params.site}/environment/`
        }]
      }
    },
    methods: {
      getSite() {
        this.$store.dispatch(`sites/${GET_SITE}`, {
          id: this.$route.params.site,
          server: this.$route.params.id,
        }).catch((error) => this.$router.push('/four-oh-four'))
      }
    }
  }
</script>