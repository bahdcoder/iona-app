<template>
  <div>
    <div class="form-inline" v-for="(env) in environment" :key="env.key">
      <input :value="env.key" readonly type="text" class="form-control-env form-control mb-2 mr-sm-2">
      <input :value="env.value" readonly type="text" class="form-control-env form-control mb-2 mr-sm-2">
      <i class="fa text-success form-control-env-action mx-2 fa-pencil-alt"></i>
      <i @click="$emit('delete-env-variable', env.key)" class="fa pointer text-danger form-control-env-action mx-2 fa-times-circle"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['environment']
  }
</script>

