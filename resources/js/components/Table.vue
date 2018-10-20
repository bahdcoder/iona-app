<template>
  <table class="table">
    <thead>
      <tr class="iona-table">
        <th v-for="(header, index) in headers" :key="index" scope="col">{{ header.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td :colspan="headers.length" align="center">
          <loader width="20" height="20" dark="true" />
        </td>
      </tr>
      <slot v-else name="body"></slot>
    </tbody>
  </table> 
</template>

<script>
  export default {
    props: ['headers', 'loading']
  }
</script>
