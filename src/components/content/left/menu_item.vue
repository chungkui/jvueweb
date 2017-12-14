<template>
  <div class="sBox">
    <div class="subNav sublist-down"><span
      class="title-icon glyphicon glyphicon-chevron-down"></span><span
      class="sublist-title">用户中心</span>
    </div>
    <ul class="navContent" style="display:block">
      <li class="active">
        <div class="showtitle" style="width:100px;">
          <img src="/static/img/leftimg.png"/>账号管理</div>
        <a href="userInfo.html">
          <span class="sublist-icon glyphicon glyphicon-user"></span>
          <span class="sub-title" >账号管理</span>
        </a>
      </li>
      <li>
        <div class="showtitle" style="width:100px;">
          <img src="/static/img/leftimg.png"/>消息中心</div>
        <a href="message.html"><span class="sublist-icon glyphicon glyphicon-envelope"></span><span
          class="sub-title">消息中心</span></a></li>
      <li>
        <div class="showtitle" style="width:100px;">
          <img src="/static/img/leftimg.png"/>短信</div>
        <a href="smsInfo.html"><span class="sublist-icon glyphicon glyphicon-bullhorn"></span><span
          class="sub-title">短信短信</span></a></li>
      <li>
        <div class="showtitle" style="width:100px;"><img src="/static/img/leftimg.png"/>实名认证</div>
        <a href="identify.html"><span
          class="sublist-icon glyphicon glyphicon-credit-card"></span><span
          class="sub-title">实名认证</span></a></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "menu_item"
    }
</script>

<style scoped>

</style>
