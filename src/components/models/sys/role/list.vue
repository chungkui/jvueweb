<template>
  <div>
    <div class="page-header">
      <div class="pull-left">
        <h4>角色管理</h4>
      </div>
    </div>
    <!--搜索框-->
    <div class="search-box row">
      <div class="col-md-8">
        <div class="form-group">
          <span class="pull-left form-span">名称:</span>
          <input type="text" v-model="searchParams.realname" class="form-control" placeholder="请输入名称">
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
          <span class="pull-left form-span">编码:</span>
          <input type="text" v-model="searchParams.username" class="form-control" placeholder="编码">
        </div>
        <div class="form-group btn-search">
          <button class="btn btn-default" v-on:click="DoRefresh"><span class="glyphicon glyphicon-search"></span> 搜索
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <div class="btn-group pull-right" role="group" aria-label="...">
          <button type="button" class="btn btn-default" v-on:click="openAddWindow"><span
            class="glyphicon glyphicon-plus"></span> 新增
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
    <!--table-->
    <div class="panel panel-default">
      <div class="panel-heading ">
        角色列表
      </div>
      <v-table
        is-horizontal-resize
        style="width:100%"
        :columns="columns"
        :table-data="roleList"
        :show-vertical-border="false"
        :is-loading="isLoading"
        ref="userTable"
      >
      </v-table>

    </div>
    <div class="panel-footer text-center">
      <v-pagination :total="totalNum" :pageSizeOption="[8,13,18]" @page-change="pageChange"
                    @page-size-change="pageSizeChange" :page-size="pageSize"></v-pagination>

    </div>
  </div>
</template>

<script>
  export default {
    name: "list",
    data: function () {
      return {
        columns:
          [
            {field: 'name', title: '编码', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'title', title: '名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {
              field: 'description',
              title: '描述',
              width: 130,
              titleAlign: 'center',
              columnAlign: 'center',
              isResize: true
            }
          ],
        roleList: [],
        searchParams: {
          locked: null,
          realname: null,
          username: null
        },
        isLoading: true,
        totalNum: 0,
        pageIndex: 1,
        pageSize: 8,
      }
    },
    created: function () {
      this.loaddata();
    }, methods: {
      loaddata:function () {
        let listUrl = server_host + "upms/role/list";
        this.$http.get(listUrl, {}).then(
          function (res) {
            this.roleList = res.body.data.list;
            this.isLoading = false;
          }, function (res) {
            this.isLoading = false;
          })
      },
      DoRefresh: function () {
        this.loaddata();
      },
      openAddWindow: function () {
        /* this.$refs.edit.dialogFormVisible = true;
         this.$refs.edit. beforeClose*/
      }
      ,
      pageChange: function (pageIndex) {
        this.pageIndex = pageIndex;
        this.loaddata();
      }, pageSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.pageIndex = 1;
        this.loaddata();
      },
    }
  }
</script>

<style scoped>

</style>
