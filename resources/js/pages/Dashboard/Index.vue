<template>
  <div class="container">
    <div class="card iona-card">
      <div class="card-header">
        Create Server
      </div>
      <div class="card-body">
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DigitalOcean from '@/components/Servers/DigitalOcean.vue'

export default {
  components: {
    DigitalOcean
  },
  computed: {
    ...mapState({
      digitalocean: state => state.auth.user.config.digitalocean
    })
  },
  data: () => ({
    panels: ['digital-ocean'],
    panelOpen: false,
    currentPanel: 'digital-ocean',
  }),
  methods: {
    openPanel(service) {
      if (!this.digitalocean) {
        return this.$router.push('/user/profile')
      }
      this.panelOpen = true
      this.currentPanel = service
    }
  }
}
</script>

