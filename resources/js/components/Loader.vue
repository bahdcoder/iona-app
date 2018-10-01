<template>
  <img
    class="loader"
    :width="width"
    :height="height"
    :src="dark ? 'https://res.cloudinary.com/bahdcoder/image/upload/v1538407323/refresh-round-symbol_wuigfq.png' : 'https://res.cloudinary.com/bahdcoder/image/upload/v1538329301/refresh-round-symbol_lmpyca.png'"
    >
</template>

<script>
  export default {
    props: ['width', 'height', 'dark']
  }
</script>
