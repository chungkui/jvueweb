<template>
  <div id="app">
    <!--头部部分-->
    <headpart></headpart>
    <!--内容部分-->
    <contentpart></contentpart>

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

</style>
