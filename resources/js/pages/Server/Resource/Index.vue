<template>
  <div>
    <div
      v-for="instance in resource.settings.instances"
      :key="instance.slug"
    >
      <panel class="mb-3" :header="instance.name">
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
      <panel
        class="mb-3"
        v-if="resource.pivot.settings[resource.slug][instance.slug] && resource.pivot.settings[resource.slug][instance.slug].length > 0"
        :header="instance.slug"
      >
        <template slot="body">
          <app-table :headers="Object.keys(instance.fields).map(item => ({ key: item, name: item }))">
            <template slot="body">
              <tr
                v-for="(r, index) in resource.pivot.settings[resource.slug][instance.slug]"
                :key="index"
              >
                <td
                  :key="i"
                  v-for="(field, i) in Object.keys(instance.fields)"
                >
                  {{ r[field] }}
                </td>
              </tr>
            </template>
          </app-table>
        </template>
      </panel>
    </div>
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
