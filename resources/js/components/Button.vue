<template>
  <button @click="$emit('click')" :type="type" class="btn btn-success" :disabled="loading">
    <loader width="14" height="14" v-if="loading" />
    <i v-else :class="icon" class="fa"></i>
    
    {{ loading ? 'Working' : name }}
  </button>
</template>

<script>
  export default {
    props: ['loading', 'name', 'type', 'icon']
  }
</script>

