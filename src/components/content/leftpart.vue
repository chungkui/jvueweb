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
          <s_menu_item v-for="(liitem,index) in item.sunList"
                       v-bind:item="liitem" v-bind:selectedId="selectedId" :key="liitem.permissionId"
          ></s_menu_item>
        </ul>
      </transition>
    </div>

  </div>
</template>
<script>
  import s_menu_item from "./left/s_menu_item";
  import lasyLoading from '../../util/lazyLoading'
  export default {
    components: {s_menu_item},
    name: "leftpart",
    data: function () {
      return {
        p_menu_list: [],
        selectedId: 0,
        pselectedId: 0
      }
    }, created: function () {
      var ment_list_url = server_host + "upms/permission/list?permissionId=1";
      this.$http.get(ment_list_url, {params: {}, credentials: true}).then((response) => {
        this.p_menu_list = response.data;
        /*这里需要动态的加载路由*/
       this.paserPermission2router()
        // 响应成功回调
      }).catch((e) => {

      });
    },
    methods: {
      dohover: function (index) {

        /* this.p_menu_list[index].isopen = !this.p_menu_list[index].isopen;*/
        if (this.pselectedId === index) {
          this.pselectedId = 0;
        } else {
          this.pselectedId = index;
        }
      },
      paserPermission2router:function () {
        debugger;
        var munulist=this.p_menu_list;
        let routerlist=[{
          path: '/',
          component: Main,
          children: []
        }];
        for(let menu in munulist){
          if(menu.sunList.length>0){
            for(let sun in menu.sunList){
              lasyLoading(sun.name);
              let routeritem= {
                path: sun.router_uri,
                name: sun.name,
                component: sun.name,
                props: true
              };
              routeritem.push(routeritem);
            }
          }
        }

        this.$router.addRoutes(routerlist);
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
