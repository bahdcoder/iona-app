<template>
  <div class="container">
    <div class="card iona-card">
      <div class="card-header">
        Create Server
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-2">
            <div :class="{ 'server-box-selected': panelOpen && currentPanel === 'digital-ocean' }" @click="openPanel('digital-ocean')" class="server-box text-center p-3">
              <img class="d-block mx-auto mb-3" width="50" height="50" src="https://res.cloudinary.com/bahdcoder/image/upload/v1538295207/DO_Logo_icon_blue_ns6vhp.png" alt="">
              Digital Ocean
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
import DigitalOcean from '@/components/Servers/DigitalOcean.vue'

export default {
  components: {
    DigitalOcean
  },
  data: () => ({
    panels: ['digital-ocean'],
    panelOpen: false,
    currentPanel: 'digital-ocean',
  }),
  methods: {
    openPanel(service) {
      this.panelOpen = true
      this.currentPanel = service
    }
  }
}
</script>

