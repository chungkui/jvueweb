<template>
  <div id="app">
    <!--头部部分-->
    <headpart></headpart>
    <!--内容部分-->
    <contentpart></contentpart>
    <!--  <router-view/>-->
  </div>
</template>

<script>
  import Headpart from './components/headpart';
  import Contentpart from "./components/contentpart";
  export default {
    name: 'app',
    components: {
      Headpart,
      Contentpart
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
