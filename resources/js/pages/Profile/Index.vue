<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <h5 class="my-4">Your Profile</h5>
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
  data: () => ({
    routes: [{
      link: '/user/profile',
      icon: 'fa fa-cloud',
      name: 'Server Providers',
    }, {
      link: '/user/profile/source-control',
      icon: 'fas fa-code-branch',
      name: 'Source Control',
    }]
  })
}
</script>

