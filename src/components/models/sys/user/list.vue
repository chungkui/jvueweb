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
          <input type="text" class="form-control" placeholder="请输入姓名">
        </div>
        <div class="form-group">
          <span class="pull-left form-span">状态:</span>
          <select class="form-control">
            <option>请选择</option>
            <option>启用</option>
            <option>禁用</option>
          </select>
        </div>
        <div class="form-group">
          <span class="pull-left form-span">登录名:</span>
          <input type="text" class="form-control" placeholder="登录名">
        </div>
        <div class="form-group btn-search">
          <button class="btn btn-default"><span class="glyphicon glyphicon-search"></span> 搜索</button>
        </div>
      </div>
      <div class="col-md-4">
        <div class="btn-group pull-right" role="group" aria-label="...">
          <button type="button" class="btn btn-default" data-toggle="modal"
                  data-target="#myModal"><span class="glyphicon glyphicon-plus"></span> 新增
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
      <div id="myAlert" style="display: none;margin-bottom:0" class="alert alert-success">
        <strong>操作成功！</strong>
      </div>
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
  </div>
</template>

<script>
  export default {
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
        pageSize: 8
      }
    },
    created:function () {
      this.loaddata();
    },
    methods:{
      loaddata: function () {
        var inner_url = server_host + 'upms/user/list';
        this.isLoading = true;
        this.$http.get(inner_url, {params: {pageIndex: this.pageIndex, pageSize: this.pageSize}}).then(function (res) {
          this.userList = res.body.data.list;
          this.totalNum = res.body.data.rowCount;
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
      }
    }
  }
</script>

<style scoped>

</style>
