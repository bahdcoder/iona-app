<template>
  <div class="card iona-card">
    <div class="card-header">
      <span v-if="header">{{ header }}</span>
      <slot name="header" v-else></slot>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['header']
}
</script>

