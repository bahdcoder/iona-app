<template>
  <div class="container">
    <h5 class="my-4">Your Profile</h5>
    <div class="row my-3">
      <div class="col-md-3">
        <ul class="iona-sidemenu">
          <li class="iona-sidemenu-item active mb-2">
            <router-link to='/user/profile'>
              <i class="fa fa-cloud mr-2"></i>
              Server Providers
            </router-link>
          </li>
          <li class="iona-sidemenu-item mb-2">
            <router-link to='/user/profile/source-control'>
              <i class="fas fa-code-branch mr-2"></i>
              Source Control
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
