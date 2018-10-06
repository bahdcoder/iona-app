<template>
<div>
   <div>
     <div class="text-center" v-if="getResourcesLoading">
       <Loader  width="20" height="20" />
     </div>
      <div class="mt-5" v-else>
         <form @submit.prevent="createServer()" role="form">
            <div class="form-group row">
               <label for="site_name" class="col-md-4 col-form-label text-md-right">Name</label> 
               <div class="col-md-6">
                 <input v-model="name" type="text" placeholder="Enter server name" class="form-control">
               </div>
            </div>
            <div class="form-group row">
               <label for="size" class="col-md-4 col-form-label text-md-right">Server Size</label> 
               <div class="col-md-6">
                  <select class="iona-select form-control">
                    <option value="512mb">
                        512MB RAM - 1 CPU Core - 20GB SSD - $0.007 / Hour - $5 / Month
                    </option>
                    <option value="s-1vcpu-1gb">
                        2GB RAM - 1 CPU Core - 25GB SSD - $0.007 / Hour - $5 / Month
                    </option>
                    <option value="1gb">
                        2GB RAM - 1 CPU Core - 30GB SSD - $0.015 / Hour - $10 / Month
                    </option>
                    <option value="s-1vcpu-2gb">
                        3GB RAM - 1 CPU Core - 50GB SSD - $0.015 / Hour - $10 / Month
                    </option>
                    <option value="s-1vcpu-3gb">
                        4GB RAM - 1 CPU Core - 60GB SSD - $0.022 / Hour - $15 / Month
                    </option>
                    <option value="s-2vcpu-2gb">
                        3GB RAM - 2 CPU Cores - 60GB SSD - $0.022 / Hour - $15 / Month
                    </option>
                    <option value="s-3vcpu-1gb">
                        2GB RAM - 3 CPU Cores - 60GB SSD - $0.022 / Hour - $15 / Month
                    </option>
                    <option value="2gb">
                        3GB RAM - 2 CPU Cores - 40GB SSD - $0.030 / Hour - $20 / Month
                    </option>
                    <option value="s-2vcpu-4gb">
                        5GB RAM - 2 CPU Cores - 80GB SSD - $0.030 / Hour - $20 / Month
                    </option>
                    <option value="4gb">
                        5GB RAM - 2 CPU Cores - 60GB SSD - $0.060 / Hour - $40 / Month
                    </option>
                    <option value="c-2">
                        5GB RAM - 2 CPU Cores - 25GB SSD - $0.060 / Hour - $40 / Month
                    </option>
                    <option value="s-4vcpu-8gb">
                        9GB RAM - 4 CPU Cores - 160GB SSD - $0.060 / Hour - $40 / Month
                    </option>
                    <option value="8gb">
                        9GB RAM - 4 CPU Cores - 80GB SSD - $0.119 / Hour - $80 / Month
                    </option>
                    <option value="c-4">
                        9GB RAM - 4 CPU Cores - 50GB SSD - $0.119 / Hour - $80 / Month
                    </option>
                    <option value="s-6vcpu-16gb">
                        17GB RAM - 6 CPU Cores - 320GB SSD - $0.119 / Hour - $80 / Month
                    </option>
                    <option value="16gb">
                        17GB RAM - 8 CPU Cores - 160GB SSD - $0.238 / Hour - $160 / Month
                    </option>
                    <option value="c-8">
                        17GB RAM - 8 CPU Cores - 100GB SSD - $0.238 / Hour - $160 / Month
                    </option>
                    <option value="s-8vcpu-32gb">
                        33GB RAM - 8 CPU Cores - 640GB SSD - $0.238 / Hour - $160 / Month
                    </option>
                    <option value="s-12vcpu-48gb">
                        50GB RAM - 12 CPU Cores - 960GB SSD - $0.357 / Hour - $240 / Month
                    </option>
                    <option value="32gb">
                        33GB RAM - 12 CPU Cores - 320GB SSD - $0.476 / Hour - $320 / Month
                    </option>
                  </select>
               </div>
            </div>
            <div class="form-group row">
               <label for="size" class="col-md-4 col-form-label text-md-right">Region</label> 
               <div class="col-md-6">
                  <select class="iona-select form-control">
                    <option value="nyc1">New York 1</option>
                    <option value="sgp1">Singapore 1</option>
                    <option value="lon1">London 1</option>
                    <option value="nyc3">New York 3</option>
                    <option value="ams3">Amsterdam 3</option>
                    <option value="fra1">Frankfurt 1</option>
                    <option value="tor1">Toronto 1</option>
                    <option value="sfo2">San Francisco 2</option>
                    <option value="blr1">Bangalore 1</option>
                  </select>
               </div>
            </div>
            <div class="form-group row">
              <label for="size" class="col-md-4 col-form-label text-md-right">Add resources</label>
              <div class="col-md-6">
                <Multiselect @selected="selectedResources = $event" @removed="selectedResources = $event" :options="resources.map(resource => ({ name: resource.name, value: resource.id }))" />
              </div>
            </div>
            <div class="form-group row">
              <div class="offset-md-4 col-md-6">
                <button type="submit" class="btn btn-success" :disabled="createServerLoading">
                  <Loader width="14" height="14" v-if="createServerLoading" />
                  <i v-else class="fa fa-plus-circle mr-1"></i>
                  
                  {{ createServerLoading ? 'Creating server ..' : 'Create Server' }}
                </button>
                <button type="button" @click="$emit('close')" class="btn btn-secondary">Cancel</button>
              </div>
            </div>
         </form>
      </div>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader.vue'
import generate from 'project-name-generator'
import Multiselect from '@/components/Multiselect'
import { GET_REGIONS_AND_SIZES, CREATE_SERVER, GET_RESOURCES } from 'store-modules/servers/constants'

export default {
  mounted() {
    this.getResources()
  },
  components: {
    Loader,
    Multiselect,
  },
  data: () => ({
    name: generate({ number: true }).dashed,
    region: 'nyc1',
    size: '512mb',
    selectedResources: []
  }),
  computed: {
    ...mapState('servers', ['createServerLoading', 'getResourcesLoading', 'resources'])
  },
  methods: {
    createServer() {
      this.$store.dispatch(`servers/${CREATE_SERVER}`, {
        name: this.name,
        region: this.region,
        size: this.size,
        resources: this.selectedResources.map(resource => resource.value)
      }).then(server => this.$router.push(`/servers/${server.id}`))
    },
    getResources() {
      this.$store.dispatch(`servers/${GET_RESOURCES}`)
    }
  }
}
</script>

<style>
  @import url('https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css');
</style>

