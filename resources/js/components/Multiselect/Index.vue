<template>
  <div class="multiselect">
    <input v-model="search" type="text" class="form-control" placeholder="Type to search ...">
    <div class="search-results my-3">
      <div class="search-result p-3" v-if="search && results.length > 0" v-for="result in results" :key="result.value">
        {{ result.name }}
        <span class="search-result-check float-right" @click="handleSelect(result)">
          <i class="far pointer fa-check-circle"></i>
        </span>
      </div>
      <div class="no-results text-center p-3" v-if="search && results.length === 0">No results found.</div>
      <div class="selected p-3" v-if="selected.length > 0">
        <button @click="handleRemove(s)" type="button" class="btn btn-sm m-2" v-for="s in selected" :key="s.value">
          <i class="far fa-times-circle"></i>
          {{ s.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options'],
  data: () => ({
    results: [],
    search: '',
    selected: []
  }),
  watch: {
    search() {
      this.results = this.options.filter(option => {
        return (option.name.indexOf(this.search) > -1) && this.selected.find(selected => selected.value === option.value) === undefined
      })
    }
  },
  methods: {
    handleSelect(result) {
      this.search = ''
      this.results.length = 0
      this.selected.push(result)
      this.$emit('selected', this.selected)
    },
    handleRemove(result) {
      // remove clicked item.
      this.selected = this.selected.filter(s => result.value !== s.value)
      this.$emit('removed', this.selected)
    }
  }
}
</script>

