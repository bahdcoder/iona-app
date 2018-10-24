<template>
  <panel
    class="mb-3"
    :header="header"
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
              v-for="(item, i) in items"
            >
              {{ item[field] }}
            </td>
          </tr>
        </template>
      </app-table>
    </template>
  </panel>
</template>

<script>
  export default {
    props: ['header']
  }
</script>

