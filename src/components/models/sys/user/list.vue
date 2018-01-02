<template>
  <div>
    <div class="page-header">
      <div class="pull-left">
        <h4>用户管理</h4>
      </div>
    </div>
    <div class="search-box row">
      <div class="col-md-8">
        <div class="form-group">
          <span class="pull-left form-span">姓名:</span>
          <input type="text" v-model="searchParams.realname" class="form-control" placeholder="请输入姓名">
        </div>
        <div class="form-group">
          <span class="pull-left form-span">状态:</span>
          <select class="form-control" v-model="searchParams.locked">
            <option>请选择</option>
            <option value="1">启用</option>
            <option value="2">禁用</option>
          </select>
        </div>
        <div class="form-group">
          <span class="pull-left form-span">登录名:</span>
          <input type="text" v-model="searchParams.username" class="form-control" placeholder="登录名">
        </div>
        <div class="form-group btn-search">
          <button class="btn btn-default" v-on:click="DoRefresh"><span class="glyphicon glyphicon-search"></span> 搜索</button>
        </div>
      </div>
      <div class="col-md-4">
        <div class="btn-group pull-right" role="group" aria-label="...">
          <button type="button" class="btn btn-default"  v-on:click="openAddWindow"><span class="glyphicon glyphicon-plus"></span> 新增
          </button>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
              <span class="glyphicon glyphicon-edit"></span> 审核
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="#">通过</a></li>
              <li><a href="#">不通过</a></li>
            </ul>
          </div>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil"></span> 编辑</button>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash"></span> 删除</button>
        </div>
      </div>

    </div>
    <div class="panel panel-default" >

      <div class="panel-heading ">
        用户管理
      </div>

      <v-table
        is-horizontal-resize
        style="width:100%"
        :columns="columns"
        :table-data="userList"
        :show-vertical-border="false"
        :is-loading="isLoading"
        ref="userTable"
      >
      </v-table>
      <div class="panel-footer text-center">
        <v-pagination :total="totalNum" :pageSizeOption="[8,13,18]" @page-change="pageChange"
                      @page-size-change="pageSizeChange" :page-size="pageSize"></v-pagination>

      </div>
    </div>
    <info ref="info" ></info>
    <edit ref="edit"  v-on:dadrefresh="DoRefresh"></edit>
    <!--<add ref="add"></add>-->
  </div>
</template>

<script>
  import edit from './edit'
  import info from './info'
  export default {
    components: {edit,info},
    name: "user",

    data:function () {
      return {

        name: "",
        key: "",
        description: "",
        userList: [],
        columns:
          [
            {field: 'userId', title: 'id', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'realname', title: '名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'sex', title: '性别', width: 130, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {
              field: 'email',
              title: 'email',
              width: 130,
              titleAlign: 'center',
              columnAlign: 'center',
              isResize: true
            }
          ],
        isLoading: true,
        totalNum: 0,
        pageIndex: 1,
        pageSize: 8,
        searchParams:{
          locked :null,
           realname:null,
          username:null
        }
      }
    },
    created:function () {
      this.loaddata();
    },
    methods:{

      DoRefresh:function () {
        this.loaddata();
      },
      loaddata: function () {
        var inner_url = server_host + 'upms/user/list';
        this.isLoading = true;
        let   searchParams=this.searchParams;
        let params= {pageIndex: this.pageIndex, pageSize: this.pageSize}

        this.$http.get(inner_url, {params: $.extend({}, params,searchParams)}).then(function (res) {
          this.userList = res.body.data.list;
          this.totalNum = res.body.data.total;
          this.isLoading = false;
        }, function (res) {
          // 处理失败的结果
        });
      },
      pageChange: function (pageIndex) {
        this.pageIndex = pageIndex;
        this.loaddata();
      }, pageSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.pageIndex = 1;
        this.loaddata();
      },
      openAddWindow:function () {
        this.$refs.edit.dialogFormVisible = true;
        this.$refs.edit. beforeClose
      }
    }
  }
</script>

<style scoped>

</style>
