<template>
  <div>
    <page-loader v-if="singleSiteLoading" />
    <page heading="Site details" :routes="routes" v-else>
      <template class="float-right" v-if="singleSite.settings" slot="header-right">
        <a :href="`https://${singleSite.settings.ionaSubdomainName}`" v-if="singleSite.settings.ionaSubdomainName" target="_blank">View Site</a>
      </template>
    </page>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Page from '@/components/Page'
  import { GET_SITE, CREATE_DEPLOYMENT_LOG } from 'store-modules/sites/constants'

  export default {
    mounted() {
      this.getSite()
      this.subscribeToSocketChannels()
    },
    components: {
      Page,
    },
    computed: {
      ...mapState('sites', ['singleSiteLoading', 'singleSite']),
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
      },
      subscribeToSocketChannels() {
        let siteConnection = this.$root.ws.getSubscription(`sites:${this.$route.params.id}`)

        if (!siteConnection) {
          siteConnection = this.$root.ws.subscribe(`sites:${this.$route.params.id}`)
        }

        siteConnection.on('deployment', log => this.$store.dispatch(`sites/${CREATE_DEPLOYMENT_LOG}`, log))
        siteConnection.on('deployment', console.log)
      }
    }
  }
</script>
