<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <panel header="Create Server">
          <template slot="body">
            <div class="row">
              <div class="col-md-2">
                <div
                  :class="{
                      'server-box-selected': panelOpen && currentPanel === 'digital-ocean',
                      'shaded': !digitalocean,
                    }"
                  @click="openPanel('digital-ocean')"
                  class="server-box text-center">
                  <img class="d-block mx-auto my-3" width="40" height="40" src="https://res.cloudinary.com/bahdcoder/image/upload/v1538295207/DO_Logo_icon_blue_ns6vhp.png" alt="">
                  <span>Digital Ocean</span>
                </div>
              </div>
            </div>

            <div v-if="panelOpen">
              <DigitalOcean @close="panelOpen = !panelOpen" v-if="currentPanel === 'digital-ocean'" />
            </div>
          </template>
        </panel>

        <panel class="mt-5" header="Servers">
          <template slot="body">
            <app-table :loading="getServersLoading" :headers="serversTableHeaders">
              <template slot="body">
                <tr v-for="server in servers" :key="server.id">
                  <td>
                    <router-link class="table-link" :to="`/servers/${server.id}`">
                      {{ server.name }}
                    </router-link>
                  </td>
                <tr/>
              </template>
            </app-table>
          </template>
        </panel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DigitalOcean from '@/components/Servers/DigitalOcean.vue'
import { GET_REGIONS_AND_SIZES, GET_SERVERS } from 'store-modules/servers/constants'

export default {
  components: {
    DigitalOcean
  },
  computed: {
    ...mapState({
      digitalocean: state => state.auth.user.config.digitalocean
    }),
    ...mapState('servers', ['servers', 'getServersLoading'])
  },
  mounted() {
    this.getServers()
  },
  data: () => ({
    panels: ['digital-ocean'],
    panelOpen: false,
    currentPanel: 'digital-ocean',
    serversTableHeaders: [{
      key: 'name',
      name: 'Name'
    }, {
      key: 'version',
      name: 'Node version'
    }, {
      key: 'ip',
      name: 'Ip Address'
    }, {
      key: 'status',
      name: 'Status'
    }]
  }),
  methods: {
    openPanel(service) {
      if (!this.digitalocean) {
        return this.$router.push('/user/profile')
      }
      this.panelOpen = true
      this.currentPanel = service
    },
    getServers() {
      this.$store.dispatch(`servers/${GET_SERVERS}`)
    }
  }
}
</script>

