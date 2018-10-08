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
                <option value="laravel">Laravel 5 +</option>
                <option value="static">Static HTML</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-form-label text-md-right col-md-4">Git repository</label>
            <div class="col-md-8">
              <input v-model="repo" placeholder="user/repository" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-md-4 col-md-6">
              <button type="submit" class="btn btn-success">
                <i class="fa fa-plus-circle mr-1"></i>
                Add site
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { CREATE_SITE } from 'store-modules/sites/constants'
  export default {
    data: () => ({
      repo: '',
      name: '',
      type: '',
    }),
    computed: {
      ...mapState('auth', ['user']),
      hasSetupRepos() {
        return this.user.config.github
      }
    },
    methods: {
      createSite() {
        this.$store.dispatch(`sites/${CREATE_SITE}`, {
          repo: this.repo,
          name: this.name,
          type: this.type,
        })
      }
    }
  }
</script>

