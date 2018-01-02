<template>
  <div class="subNavBox">
    <div class="sBox" v-for="(item,index) in p_menu_list" :key="item.id">

      <div class="subNav " v-bind:class="item.permissionId==pselectedId?'sublist-down':'sublist-up'"
           v-on:click="dohover(item.permissionId)">
         <span data-toggle="tooltip" data-placement="right" v-bind:title="item.name" class="title-icon glyphicon "
               v-bind:class="item.permissionId==pselectedId?'glyphicon-chevron-down':'glyphicon-chevron-right'"></span>
        <span class="sublist-title">{{item.name}}</span>
      </div>
      <transition name="fade">
        <ul class="navContent" v-show="item.permissionId==pselectedId">
          <s_menu_item v-for="(liitem,index) in item.children"
                       v-bind:item="liitem" :key="liitem.permissionId"
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

      }
    },
    computed : {
      p_menu_list () {
        return this.$store.state.p_menu_list;
      },
      pselectedId () {
        return this.$store.state.pselectedId;
      }
    },

    methods: {
      dohover: function (index) {
        if (this.pselectedId === index) {
          this.$store.commit("setPselectedId",0);
        } else {
          this.$store.commit("setPselectedId",index);

        }
      }
    }
  }
</script>
<style scoped>
  .fade-enter-active {
    transition: opacity .96s
  }

  .fade-leave-active {
    transition: opacity .0s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0
  }
</style>
