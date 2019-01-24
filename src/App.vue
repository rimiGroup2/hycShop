<template>
  <div id="app">
    <category></category>
    <router-view/>
  </div>
</template>

<script>
import category from './components/category/Category'

export default {
  name: 'App',
  components:{
    category
  }
}
</script>
<style>
#app {

}
</style>
