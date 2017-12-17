<template>
  <div class="subNavBox">
    <div class="sBox"  v-for="(item,index) in p_menu_list" :key="item.id">
      <div class="subNav " v-bind:class="item.isopen?'sublist-down':'sublist-up'"  v-on:click="dohover(index)">
        <span class="title-icon glyphicon " v-bind:class="item.isopen?'glyphicon-chevron-down':'glyphicon-chevron-up'"></span><span
        class="sublist-title">{{item.name}}</span>
      </div>
      <s_menu_list v-bind:childList="item.sunList"></s_menu_list>
    </div>
    <!-- <menu_item v-for="(item,index) in p_menu_list" :key="item.id"
     v-bind:childList="item.childList"
     >
     </menu_item>-->
  </div>
</template>
<script>
  import s_menu_list from "./left/s_menu_list";

  export default {
    components: {s_menu_list},
    name: "leftpart",
    data: function () {
      return {
        p_menu_list: []
      }
    }, created: function () {

      var ment_list_url = server_host + "upms/menu/list";
      this.$http.get(ment_list_url, {}, {
        headers: {},
        emulateJSON: true
      }).then((response) => {

        this.p_menu_list = response.data;
        // 响应成功回调
      }).catch((e) => {
        debugger
      });
    },
    methods: {
      dohover:function (index) {
        this.p_menu_list[index].isopen=!this.p_menu_list[index].isopen;
      }
    }
  }
</script>
<style scoped>

</style>
