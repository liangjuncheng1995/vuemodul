<template>
  <div id="app">
  	<m-header></m-header>
    <keep-alive include="Home">
  	  <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from '@/page/m-header/m-header'
export default {
  name: 'App',
  components: {
  	MHeader
  }

}
</script>

<style>

</style>
