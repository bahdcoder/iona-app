<template>
  <div class="container">
    <div v-if="singleSite.repository">
      <panel>
        <template slot="header">
          Deployment
          <button class="btn btn-info float-right">Deploy Now</button>
        </template>
        <template slot="body">
          <div class="alert alert-warning">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid commodi illum minima laboriosam.
          </div>
        </template>
      </panel>
      <panel class="mt-4" header="Deployment branch">
        <template slot="body">
          <div class="alert alert-info">
            Lorem ipsum dolor sit amet c.
          </div>
          <form>
            <div class="form-group row">
              <label class="col-md-4 col-form-label text-right">Branch</label>
              <div class="col-md-8">
                <input v-model="branch" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group row">
              <div class="offset-md-4 col-md-6">
                <button type="submit" class="btn btn-success">
                  <i class="fa fa-plus-circle mr-1"></i>
                  
                  Update branch
                </button>
              </div>
            </div>
          </form>
        </template>
      </panel>
    </div>
    <panel header="Install Repository" v-else>
      <template slot="body">
        <form @submit.prevent="createSiteRepo">
          <div class="form-group row">
            <label class="col-md-4 col-form-label text-md-right">Provider</label>
            <div class="col-md-8">
              <select class="iona-select form-control" v-model="provider">
                <option value="" disabled>Select provider</option>
                <option value="github">Github</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="repo" class="col-md-4 col-form-label text-md-right">Name</label> 
            <div class="col-md-8">
              <input class="form-control" v-model="repo" type="text" placeholder="user/repository" value="github">
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-md-4 col-md-6">
              <button type="submit" class="btn btn-success" :disabled="createSiteRepoLoading">
                <loader width="14" height="14" v-if="createSiteRepoLoading" />
                <i v-else class="fa fa-plus-circle mr-1"></i>
                
                {{ createSiteRepoLoading ? 'Adding repository ..' : 'Add repository' }}
              </button>
            </div>
          </div>
        </form>
      </template>
    </panel>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { CREATE_SITE_REPO } from 'store-modules/sites/constants'
  export default {
    computed: {
      ...mapState('sites', ['singleSite', 'createSiteRepoLoading'])
    },
    data: () => ({
      repo: '',
      provider: '',
      branch: ''
    }),
    methods: {
      createSiteRepo() {
        this.$store.dispatch(`sites/${CREATE_SITE_REPO}`, {
          data: {
            repo: this.repo,
            provider: this.provider,
          },
          server: this.$route.params.id,
          site: this.$route.params.site,
        })
      }
    },
    watch: {
      singleSite() {
        console.log('-----><<<<----')
      }
    }
  }
</script>
