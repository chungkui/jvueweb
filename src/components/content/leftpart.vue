<template>
  <div class="subNavBox">
    <div class="sBox" v-for="(item,index) in p_menu_list" :key="item.id">
      <div class="subNav " v-bind:class="item.id==pselectedId?'sublist-down':'sublist-up'" v-on:click="dohover(item.id)">
        <span class="title-icon glyphicon "
              v-bind:class="item.id==pselectedId?'glyphicon-chevron-down':'glyphicon-chevron-right'"></span><span
        class="sublist-title">{{item.name}}</span>
      </div>
      <transition name="fade">
      <ul class="navContent" v-show="item.id==pselectedId">
        <s_menu_item v-for="(liitem,index) in item.sunList"
                     v-bind:item="liitem" v-bind:selectedId="selectedId" :key="liitem.id"
        ></s_menu_item>

      </ul>
      </transition>
    </div>

  </div>
</template>
<script>
  import s_menu_item from "./left/s_menu_item";
  export default {
    components: {s_menu_item},
    name: "leftpart",
    data: function () {
      return {
        p_menu_list: [],
        selectedId:'',
        pselectedId:0
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

      });
    },
    methods: {
      dohover: function (index) {
       /* this.p_menu_list[index].isopen = !this.p_menu_list[index].isopen;*/
       if(this.pselectedId===index){
         this.pselectedId=0;
       }else{
         this.pselectedId=index;
       }

      }
    }
  }
</script>
<style scoped>
  .fade-enter-active {
    transition: opacity .1s
  }
    .fade-leave-active{
      transition: opacity .1s
    }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
