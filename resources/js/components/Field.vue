<template>
  <div class="form-group row">
    <label for="repo" class="col-md-4 col-form-label text-md-right text-capitalize">{{ name }}</label> 
    <div class="col-md-8">
      <input class="form-control" type="text">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['name', 'slug ']
  }
</script>
