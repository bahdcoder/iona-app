<template>
  <div>
    <page-loader v-if="singleSiteLoading" />
    <page heading="Site details" :routes="routes" v-if="!singleSiteLoading && created">
      <template class="float-right" v-if="singleSite.settings" slot="header-right">
        <a :href="`https://${singleSite.settings.ionaSubdomainName}`" v-if="singleSite.settings.ionaSubdomainName" target="_blank">View Site</a>
      </template>
    </page>
    <div class="container" v-if="!created">
      <panel header="Creating site">
        <template slot="body">
          <h4 class="text-center">Creating site </h4>
          <div class="text-center my-5">
            <loader dark="true" width="20" height="20" />
          </div>
        </template>
      </panel>
    </div>
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
      },
      created() {
        if (this.singleSite && this.singleSite && this.singleSite.settings && this.singleSite.settings.created) {
          return true
        }

        return false
      }
    },
    methods: {
      getSite() {
        let serverCalledTimes = 0
        const dispatchGetSite = () => {
          serverCalledTimes++
          this.$store.dispatch(`sites/${GET_SITE}`, {
            id: this.$route.params.site,
            server: this.$route.params.id,
          })
          .then(() => {
            clear()
          })
          .catch((error) => {
            this.$router.push('/four-oh-four')
          })
        }

        dispatchGetSite()

        const interval = setInterval(dispatchGetSite, 5000)
        const clear = () => {
          if (this.created) {
            clearInterval(interval)
          }
        }
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
