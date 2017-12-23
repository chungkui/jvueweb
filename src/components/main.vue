<template>
  <!--头部部分-->
  <div>
    <headpart></headpart>
    <!--内容部分-->
    <contentpart></contentpart>
  </div>

</template>

<style>
  body {
    background-color: gainsboro;
  }
</style>

<script>
  import Headpart from './headpart';
  import Contentpart from "./contentpart";
  export default {
    data() {
      return {msg: '主页面'}
    }, components: {
      Headpart,
      Contentpart
    }
  }
</script>
