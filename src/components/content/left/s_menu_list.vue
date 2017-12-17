<template>

  <ul class="navContent">
    <!-- <li class="showtitle" v-for="item in childList" style="width:100px;">

     </li>-->
    <li class="active:index==0" v-for="(item,index) in childList" v-on:mouseenter="li_mouseenter"
        v-on:mouseleave="li_mouseleave">
      <div class="showtitle" style="width:100px;" v-bind:style="{display:isshow?'block':'none'}">
        <img src="/static/img/leftimg.png"/>{{item.name}}
      </div>
      <a href="userInfo.html">
        <span class="sublist-icon glyphicon" v-bind:class="item.icon"></span>
        <span class="sub-title">{{item.name}}</span>
      </a>
    </li>
    <!--<li>
      <div class="showtitle" style="width:100px;">
        <img src="/static/img/leftimg.png"/>消息中心
      </div>
      <a href="message.html"><span class="sublist-icon glyphicon glyphicon-envelope"></span><span
        class="sub-title">消息中心</span></a></li>
    <li>
      <div class="showtitle" style="width:100px;">
        <img src="/static/img/leftimg.png"/>短信
      </div>
      <a href="smsInfo.html"><span class="sublist-icon glyphicon glyphicon-bullhorn"></span><span
        class="sub-title">短信短信</span></a></li>
    <li>
      <div class="showtitle" style="width:100px;"><img src="/static/img/leftimg.png"/>实名认证</div>
      <a href="identify.html"><span
        class="sublist-icon glyphicon glyphicon-credit-card"></span><span
        class="sub-title">实名认证</span></a></li>-->
  </ul>

</template>

<script>
  export default {
    name: "s_menu_list",
    data:function(){
      return {
        isshow:false
      }
    },
    props: {
      childList: {
        type: Array
      }
    }, methods: {
      li_mouseenter: function () {
       /* if($(this).find("span:last-child").css("display")=="none")*/
       this.isshow=true;
      },
      li_mouseleave: function () {
        this.isshow=false;
      }
    }
  }
</script>

<style scoped>

</style>
