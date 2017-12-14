<template>
  <div class="down-main">
    <div class="left-main " v-bind:class="{'left-full':isfull,'left-off':!isfull}">
      <div class="sidebar-fold"v-on:click="dohover"><span class="glyphicon glyphicon-menu-hamburger"></span></div>
      <leftpart></leftpart>
    </div>
    <rightpart  v-bind:class="{'right-full':isfull,'right-off':!isfull}" ></rightpart>
  </div>
</template>

<script>
  import Leftpart from "./content/leftpart";
  import Rightpart from "./content/rightpart";

  export default {
    components: {
      Rightpart,
      Leftpart
    },
    name: "contentpart",
    data:  function () {
      return{
        isfull:true
      }
    },
    methods: {
      dohover:function () {
        this.isfull=!this.isfull;

      }

    }
  }
</script>

<style scoped>

</style>
