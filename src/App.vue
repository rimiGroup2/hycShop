<template>
  <div id="app">
    <transition name="slide-right">
      <router-view class="router-view"></router-view>
    
    </transition>
  </div>
</template>

<script>
// import category from './components/category/Category'

export default {
  name: 'App',
  components:{

  }
}
</script>
<style>
</style>
