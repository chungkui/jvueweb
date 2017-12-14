<template>
  <div class="subNavBox">
    <menu_item></menu_item>
  </div>
</template>
<script>
  import menu_item from "./left/menu_item";

  export default {
    components: {menu_item},
    name: "leftpart",
    data: function () {
      return {}
    }, created: function () {
        alert(232);
    },
    methods: {}
  }
</script>
<style scoped>

</style>
