<template>
  <div>
    <page-loader v-if="singleServerLoading" />
    <div class="container-fluid" v-else>
      <div class="row justify-content-center">
        <div class="col-md-9">
          <h5 class="my-4" v-if="deployed">Server Details</h5>
          <div class="row my-3" :class="{ 'justify-content-center': !deployed }">
            <div class="col-md-3" v-if="deployed">
              <dynamic-nav :routes="routes" />
            </div>
            <div class="col-md-9">
              <panel header="Server loading" v-if="!deployed">
                <template slot="body">
                  <h4 class="text-center">Deploying server</h4>
                  <div class="text-center my-5">
                    <loader dark="true" width="20" height="20" />
                  </div>
                </template>
              </panel>
              <router-view v-else></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { GET_SITES } from 'store-modules/sites/constants'
  import { GET_SERVER } from 'store-modules/servers/constants'
  
  export default {
    mounted() {
      this.getServer()
    },
    data: () => ({}),
    computed: {
      ...mapGetters('servers', ['server']),
      ...mapState('servers', ['singleServerLoading', 'singleServer']),
      deployed() {
        if (this.server.stats && this.server.stats.status === 'active') {
          return true
        }

        return false
      },
      routes() {
        return [{
          name: 'Sites',
          icon: 'fas fa-desktop',
          link: `/servers/${this.$route.params.id}/sites`
        },
        ...this.server.resources.map(resource => ({
          name: resource.name,
          link: `/servers/${this.$route.params.id}/resources/${resource.slug}`,
          icon: resource.icon,
        })), {
          name: 'Resources',
          icon: 'fas fa-cube',
          link: `/servers/${this.$route.params.id}/resources`
        },
        ]
      }
    },
    methods: {
      getServer() {
        let serverCalledTimes = 0
        const dispatchToServer = () => {
          serverCalledTimes++
          this.$store.dispatch(`servers/${GET_SERVER}`, { id: this.$route.params.id, serverCalledTimes })
            .catch(() => {
              this.$router.push('/four-oh-four')
              clear()
            })
            .then(() => {
              this.$store.dispatch(`sites/${GET_SITES}`, {
                server: this.$route.params.id
              })
              clear()
            })
        }

        dispatchToServer()

        const interval = setInterval(dispatchToServer, 20000)

        const clear = () => {
          if (this.deployed) {
            clearInterval(interval)
          }
        }
      }
    }
  }
</script>

