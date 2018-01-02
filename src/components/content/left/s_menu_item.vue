<template>

    <li v-bind:class="{active:item.permissionId==selectedId}"   v-on:mouseenter="li_mouseenter"
        v-on:mouseleave="li_mouseleave"  >
      <div class="showtitle" style="width:100px;"  v-bind:class="{'divshow':isdivshow}" ><!--v-bind:style="{display:isshow?'block':'none'}"-->
        <img src="/static/img/leftimg.png"/>{{item.name}}
      </div>
      <!--<router-link to="/foo">Go to Foohref="userInfo.html"</router-link>-->
      <a  href="javascript:void(0)" v-on:click="loadlink(item.routerUri)">
        <span class="sublist-icon glyphicon" v-bind:class="item.icon"></span>
        <span class="sub-title">{{item.name}}</span>
      </a>
    </li>

</template>

<script>
  export default {
    name: "s_menu_item",
    data:function(){
      return {
        isdivshow:false,
      }
    },
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      loadlink:function (link) {
        this.$router.push(link);
      },
      li_mouseenter: function () {
       this.isdivshow=true;
      },
      li_mouseleave: function () {
        this.isdivshow=false;
      }
    },
    computed:{

      selectedId:function () {
        return this.$store.state.selectMenuId;
      }
    }
  }
</script>

<style scoped>

</style>
