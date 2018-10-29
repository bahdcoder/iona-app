<template>
  <div>
    <panel
      class="mb-3"
      header="Environment Variables"
      >
      <template slot="body">
        <div class="alert alert-info f-14">
          Here you may set environment variables for your site. These variables are automatically set on the server before starting the application.
        </div>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <EnvSet
              :environment="environment"
              @delete-env-variable="deleteEnvVariable($event)"
            />
            <div class="form-inline">
              <input v-model="key" type="text" class="form-control-env form-control mb-2 mr-sm-2">
              <input v-model="value" type="text" class="form-control-env form-control mb-2 mr-sm-2">
              <button @click="addEnvVariable" class="btn form-control-env-action btn-sm btn-success">Add</button>
            </div>
          </div>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import EnvSet from '@/components/EnvSet.vue'
  import { CREATE_SITE_ENV, DELETE_SITE_ENV } from 'store-modules/sites/constants'

  export default {
    components: {
      EnvSet
    },
    data: () => ({
      key: '',
      value: ''
    }),
    computed: {
      ...mapState({
      
      }),
      ...mapGetters('sites', ['environment'])
    },
    methods: {
      addEnvVariable() {
        this.$store.dispatch(`sites/${CREATE_SITE_ENV}`, {
          key: this.key,
          value: this.value,
          server: this.$route.params.id,
          site: this.$route.params.site
        }).then(() => {
          this.key = ''
          this.value = ''
        })
      },
      deleteEnvVariable(key) {
        this.$store.dispatch(`sites/${DELETE_SITE_ENV}`, {
          key,
          server: this.$route.params.id,
          site: this.$route.params.site
        })
      }
    }
  }
</script>
