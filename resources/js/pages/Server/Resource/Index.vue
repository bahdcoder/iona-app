<template>
  <div>
    <panel
      class="mb-3"
      :header="`${resource.name} default settings`"
    >
     <template slot="body">
       <code>
        <p class="text-center" v-for="(setting, key) in resource.pivot.settings[`${resource.slug}`]" :key="key">{{ key }} : {{ setting }}</p>
       </code>
     </template>
    </panel>
    <panel class="mb-3" :key="instance.slug" v-for="instance in resource.settings.instances" :header="instance.name">
      <template slot="body">
        <field
          :key="field"
          :name="field"
          v-for="(value, field) in instance.fields"
        />
        
        <div class="form-group row">
          <div class="offset-md-4 col-md-6">
            <iona-button
              icon="fa-plus-circle mr-1"
              :name="instance.name"
            />
          </div>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('servers', ['singleServer']),
      resource () {
        return this.singleServer.resources
          .find(resource => resource.name === this.$route.params.resource)
      }
    },
  }
</script>
