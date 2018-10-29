<template>
  <div>
    <panel header="Add a site">
      <template slot="body">
        <form @submit.prevent="createSite" v-if="hasSetupRepos">
          <div class="form-group row">
            <label for="" class="col-form-label text-md-right col-md-4">Root domain</label>
            <div class="col-md-8">
              <input v-model="name" type="text" class="form-control" placeholder="domain.com">
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-form-label text-md-right col-md-4">Project type</label>
            <div class="col-md-8">
              <select class="form-control iona-select" v-model="type">
                <option disabled selected value="">Select project type</option>
                <option value="nodejs">Node js</option>
                <option value="adonisjs">Adonis js</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-md-4 col-md-6">
              <button type="submit" :disabled="createSiteLoading" class="btn btn-success">
                <i v-if="!createSiteLoading" class="fa fa-plus-circle mr-1"></i>
                <loader v-else width="14" height="14" />
                {{ createSiteLoading ? 'Adding site' : 'Add site' }}
              </button>
            </div>
          </div>
        </form>
        <p v-else class="text-center display-5 my-4">
          Setup a
          <router-link to='/user/profile/source-control'>
            Repository Provider
          </router-link> to add a site
        </p>
      </template>
    </panel>
    <panel class="mt-5" header="Sites">
      <template slot="body">
        <app-table :loading="getSitesLoading" :headers="[{ name: 'Domain', key: 'domain' }, { name: 'App', key: 'domain' }]">
          <template slot="body">
            <tr v-for="site in sites" :key="site.id">
              <td>
                <router-link class="table-link" :to="`/servers/${$route.params.id}/sites/${site.id}`">
                  {{ site.name }}
                </router-link>
              </td>
            </tr>
          </template>
        </app-table>
      </template>
    </panel>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { CREATE_SITE, GET_SITES } from 'store-modules/sites/constants'
  export default {
    data: () => ({
      repo: '',
      name: '',
      type: '',
      provider: '',
    }),
    computed: {
      ...mapState('auth', ['user']),
      ...mapState('sites', ['createSiteLoading', 'sites', 'getSitesLoading']),
      hasSetupRepos() {
        return this.user.config.github
      }
    },
    methods: {
      createSite() {
        this.$store.dispatch(`sites/${CREATE_SITE}`, {
          data: {
            repo: this.repo,
            name: this.name,
            type: this.type,
          },
          id: this.$route.params.id
        })
      },
    }
  }
</script>

