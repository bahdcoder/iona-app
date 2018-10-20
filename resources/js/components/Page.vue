<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <h5 class="my-4">{{ heading }}</h5>
        <div class="row my-3">
          <div class="col-md-3">
            <dynamic-nav :routes="routes" />
          </div>
          <div class="col-md-9">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['routes', 'heading']
  }
</script>

