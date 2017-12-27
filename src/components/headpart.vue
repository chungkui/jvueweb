<template>
  <nav class="nav navbar-default navbar-mystyle navbar-fixed-top">
    <div class="navbar-header">
      <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand mystyle-brand" v-on:click="gotuhome"><span class="glyphicon glyphicon-home"></span></a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li class="li-border"><a class="mystyle-color" v-on:click="gotuhome" href="#">主页</a></li>
        <li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color"
                                          data-toggle="dropdown">功能介绍<span
          class="caret"></span></a>
          <!----下拉框选项---->
          <div class="dropdown-menu topbar-nav-list">
            <div class="topbar-nav-col">
              <div class="topbar-nav-item">
                <p class="topbar-nav-item-title">前端技术</p>
                <ul>
                  <li><a target="_blank" href="http://www.bootcss.com/">
                    <span class="glyphicon glyphicon-road"></span>
                    <span class="">bootcss</span>
                  </a>
                  </li>
                  <li><a target="_blank" href="https://cn.vuejs.org/">
                    <span class="glyphicon glyphicon-picture"></span>
                    <span class="">vuejs</span>
                  </a>
                  </li>
                  <li><a target="_blank" href="https://router.vuejs.org/zh-cn/">
                    <span class="glyphicon glyphicon-gift"></span>
                    <span class="">vuerouter</span>
                  </a>
                  </li>
                </ul>
              </div>

              <div class="">
                <p class="topbar-nav-item-title">资料库</p>
                <ul>
                  <li><a target="_blank" href="https://github.com/">
                    <span class="glyphicon glyphicon-road"></span>
                    <span class="">github</span>
                  </a>
                  </li>
                  <li><a target="_blank" href="https://github.com/huangshuwei/vue-easytable">
                    <span class="glyphicon glyphicon-picture"></span>
                    <span class="">vue-easytable</span>
                  </a>
                  </li>
                  <li><a target="_blank" href="https://gitee.com/">
                    <span class="glyphicon glyphicon-gift"></span>
                    <span class="">gitee</span>
                  </a>
                  </li>
                </ul>
              </div>
            </div>


            <div class="topbar-nav-col">
              <div class="topbar-nav-item">
                <p class="topbar-nav-item-title">后台资料库</p>
                <ul>
                  <li><a target="_blank" href="https://gitee.com/shuzheng/zheng">
                    <span class="glyphicon glyphicon-road"></span>
                    <span class="">zheng</span>
                  </a>
                  </li>
                  <li><a target="_blank" href="http://projects.spring.io/spring-framework/">
                    <span class="glyphicon glyphicon-picture"></span>
                    <span class="">spring</span>
                  </a>
                  </li>
                  <li><a target="_blank" href="http://www.mybatis.org/mybatis-3/zh/index.html">
                    <span class="glyphicon glyphicon-gift"></span>
                    <span class="">mybatis</span>
                  </a>
                  </li>
                </ul>
              </div>

              <div class="">
                <p class="topbar-nav-item-title">作者相关</p>
                <ul>
                  <li><a target="_blank" href="http://www.qqxh.net/">
                    <span class="glyphicon glyphicon-road"></span>
                    <span class="">清浅小河</span>
                  </a>
                  </li>
                  <li><a target="_blank" href="https://github.com/purecreek">
                    <span class="glyphicon glyphicon-picture"></span>
                    <span class="">purecreek</span>
                  </a>
                  </li>
                  <li><a target="_blank" href="https://gitee.com/jvue/">
                    <span class="glyphicon glyphicon-gift"></span>
                    <span class="">jvue</span>
                  </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </li>
      </ul>

      <ul class="nav navbar-nav pull-right">
        <li class="li-border">
          <a href="#" class="mystyle-color">
            <span class="glyphicon glyphicon-bell"></span>
            <span class="topbar-num">0</span>
          </a>
        </li>
        <li class="li-border dropdown"><a href="#" class="mystyle-color" data-toggle="dropdown">
          <span class="glyphicon glyphicon-search"></span> 搜索</a>
          <div class="dropdown-menu search-dropdown">
            <div class="input-group">
              <input type="text" class="form-control">
              <span class="input-group-btn">
                   <button type="button" class="btn btn-default">搜索</button>
                </span>
            </div>
          </div>
        </li>
        <li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color"
                                          data-toggle="dropdown">帮助与文档<span
          class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a target="_blank" href="https://github.com/purecreek/jvueweb">帮助与文档</a></li>
            <li target="_blank" href="https://github.com/purecreek/jvueweb" class="divider"></li>
            <li><a target="_blank" href="https://github.com/purecreek/jvueweb">论坛</a></li>
            <li target="_blank" href="https://github.com/purecreek/jvueweb" class="divider"></li>
            <li><a target="_blank" href="http://www.qqxh.net">博客</a></li>
          </ul>
        </li>
        <li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown"><span
          class="glyphicon glyphicon-user"> </span> {{username}}<span
          class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#" v-on:click="loginout">退出</a></li>
          </ul>
        </li>
        <!--<li class="dropdown"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">换肤<span
          class="caret"></span></a>
          <ul class="dropdown-menu changecolor">
            <li id="blue"><a href="#">蓝色</a></li>
            <li class="divider"></li>
            <li id="green"><a href="#">绿色</a></li>
            <li class="divider"></li>
            <li id="orange"><a href="#">橙色</a></li>
          </ul>
        </li>-->
      </ul>
    </div>
  </nav>

</template>

<script>
  export default {
    name: "headpart",
    methods: {
      loginout: function () {
        var logout_url = server_host + "/logout";
        this.$http.get(logout_url, {params: {}, credentials: true}).then((response) => {
        }).catch((e) => {
        });
      },
      gotuhome: function () {
        this.$router.push('/');
      }
    },
    computed: {
      username () {
      var userinfo= this.$store.state.userinfo;
      if(userinfo===null){
        var userinfo_url = server_host + "upms/login/userinfo";
        this.$http.get(userinfo_url, {params: {}, credentials: true}).then((response) => {
          userinfo = response.body.data;
          /*异步的只能通过提交action来实现*/
          this.$store.dispatch("setuserinfoact",userinfo);
          // 响应成功回调
        }).catch((e) => {
        });
        return "";
      }
        return userinfo.username
      }
    }
  }
</script>

<style scoped>

</style>
