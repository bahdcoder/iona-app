<template>
  <ul class="iona-sidemenu list-item">
    <li class="iona-sidemenu-item list-group-item active mb-2" v-for="route in routes" :key="route.name">
      <router-link :to='route.link' class="text-capitalize">
        <i :class="`${route.icon} mr-2`"></i>
        {{ route.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['routes']
  }
</script>
