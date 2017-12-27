<template>
  <div>
    <div class="page-header">
      <div class="pull-left">
        <h4>流程定义</h4>
      </div>

    </div>

    <div class="search-box row">
      <div class="col-md-8">
        <div class="form-group">
          <span class="pull-left form-span">名称:</span>
          <input type="text" class="form-control" placeholder="请输入名称">
        </div>
        <div class="form-group">
          <span class="pull-left form-span">状态:</span>
          <select class="form-control">
            <option>请选择</option>
            <option>发布</option>
            <option>未发布</option>
          </select>
        </div>
        <div class="form-group">
          <span class="pull-left form-span">key:</span>
          <input type="text" class="form-control" placeholder="key">
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
            <button type="button" v-on:click="resize" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
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
    <div class="panel panel-default" v-on:resize="resize">
      <div id="myAlert" style="display: none;margin-bottom:0" class="alert alert-success">

        <strong>操作成功！</strong>
      </div>
      <div class="panel-heading ">
        流程管理
      </div>

      <v-table
        is-horizontal-resize
        style="width:100%"
        :columns="columns"
        :table-data="modeList"
        :show-vertical-border="false"
        :is-loading="isLoading"
        ref="flowdefineTable"
      >
      </v-table>
      <div class="panel-footer text-center">
        <v-pagination :total="totalNum" :pageSizeOption="[8,13,18]" @page-change="pageChange"
                      @page-size-change="pageSizeChange" :page-size="pageSize"></v-pagination>

      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">创建新流程</h4>
          </div>
          <div class="modal-body">
            <form id="modelform">
              <div class="form-group">
                <label for="name">名称</label>
                <input type="text" class="form-control" id="name" v-model="name" name="name"
                       placeholder="名称">
              </div>
              <div class="form-group">
                <label for="key">流程key</label>
                <input type="text" class="form-control" id="key" v-model="key" name="key" placeholder="key">
              </div>
              <div class="form-group">
                <label for="description">描述</label>
                <textarea class="form-control" id="description" v-model="description" name="description"
                          rows="3"
                          placeholder="描述"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" v-on:click="submit">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {

    name: "flow-define",
    props: {
      permissionId: {type: String}
    },
    data: function () {
      return {
        name: "",
        key: "",
        description: "",
        modeList: [],
        layer: null,
        columns:
          [
            {field: 'name', title: '名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'id', title: 'id', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'key', title: 'key', width: 130, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {
              field: 'createTime',
              title: '创建时间',
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
    }
    , created: function () {
      this.loaddata();
    }
    , methods: {
      resize: function () {
        this.$refs.flowdefineTable.resize();
      },
      loaddata: function () {
        var inner_url = server_host + '/flowDefine/list';
        this.isLoading = true;
        this.$http.get(inner_url, {params: {pageIndex: this.pageIndex, pageSize: this.pageSize}}).then(function (res) {
          this.modeList = res.body.data.list;
          this.totalNum = res.body.data.rowCount;
          this.isLoading = false;
          /*$("#dbtime").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss', language:  'zh-CN'});*/
        }, function (res) {
          // 处理失败的结果
        });
      },
      submit: function () {
        var inner_url = server_host + "/flowDefine/create";
        this.$http.post(inner_url, {
          name: this.name,
          key: this.key,
          description: this.description
        }).then(
          function (res) {

            if (200 === res.body.state) {

              $("#myModal").modal("hide");
              var myurl = server_host + "/modeler.html?modelId=" + res.body.bizdata;
              this.edit(myurl)
            } else if (500 === res.body.state) {
              alert(res.body.data.message);

            }
          }, function (res) {
          }
        )
      },
      edit: function (url) {
        var index = layer.open({
          type: 2,
          content: url,
          area: ['1024px', '760px'],
          maxmin: true
        });
        this.layer = index;
        layer.full(this.layer);
      }, deploy: function (modelid, index) {
        var inner_url = server_host + "/flowDefine/deploy/" + modelid;
        this.$http.post(inner_url, {}).then(
          function (res) {
            if (200 === res.body.state) {
              alert(res.body.description);
            } else if (500 === res.body.state) {
              alert(res.body.description);
            }
          }, function (res) {
          })
      }, deleteModel: function (modelid, index) {
        var inner_url = server_host + "/flowDefine/delete/" + modelid;
        this.$http.post(inner_url, {}).then(
          function (res) {
            this.modeList.splice(index, 1)
            if (200 === res.body.state) {
              this.docomfirm();
            } else if (500 === res.body.state) {
              alert(res.body.data.message);
            }
          }, function (res) {
          })
      }, exportModel: function (modelid, filename, type) {

        var inner_url = server_host + '/flowDefine/export/' + modelid + '/' + type;
        /* window.location.href=inner_url;*/
        var a = document.createElement('a');
        /* var url =(window.URL || window.webkitURL).createObjectURL(inner_url); */
        var filename = filename;
        a.href = inner_url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(inner_url);

      },
      docomfirm: function () {
        $("#myAlert").slideDown("fast");
        var inertime = window.setTimeout(function () {
          $("#myAlert").slideUp("fast");
          window.clearTimeout(inertime)
        }, 1000);
      }, pageChange: function (pageIndex) {
        this.pageIndex = pageIndex;
        this.loaddata();
      }, pageSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.pageIndex = 1;
        this.loaddata();
      }
    }
    ,
    filters: {
      DateFormat: function (cellval) {
        if (cellval != null) {
          var date = new Date(parseInt(cellval, 10));
          var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
          var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          return date.getFullYear() + "-" + month + "-" + currentDate;
        }
      }
    }
  }
</script>

<style scoped>

</style>
