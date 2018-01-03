<template>
  <el-container>
    <el-aside width="200px">
        <p class="treetip">请通过右击节点进行操作</p>
        <div class="ztree" id="treeContent">
            <router-view></router-view>
        </div>
    </el-aside>
    <el-main>
      <div id="rMenu">
        <ul class="dropdown-menu">
          <li id="m_add" onclick="viewTreeNode();">查看</li>
          <li id="m_del" onclick="disableTreeNode();">禁用/启用</li>
          <li id="m_check" onclick="addTreeNode();">添加下级</li>
          <li id="m_unCheck" onclick="editTreeNode();">编辑</li>
        </ul>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    name: "list",
    data: function () {
      return {
        ztree: null
      }
    },
    mounted: function () {
      let setting = {
        data: {
          simpleData: {

            enable: true,
            idKey: "permissionId",
            pIdKey: "pid"/*,
                rootPId: 0*/

          }
        },

        callback: {
          onRightClick: this.zTreeOnRightClick,
          onClick: this.zTreeOnClick,
          onAsyncSuccess: this.zTreeOnAsyncSuccess
        },
        async: {
          enable: true,
          url: server_host + 'upms/permission/listAll',
          autoParam: ["permissionId", "name"],
          otherParam: {"otherParam": "zTreeAsyncTest"}

        }

      };
      this.zTree = $.fn.zTree.init($("#treeContent"), setting, []);


    },
    methods: {
      zTreeOnRightClick:function(event, treeId, treeNode) {

        if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {

          this.zTree.cancelSelectedNode();

           this.showRMenu("root", event.clientX, event.clientY);

        } else if (treeNode && !treeNode.noR) {

          this.zTree.selectNode(treeNode);

          this.showRMenu("node", event.clientX, event.clientY);

        }
      }
    ,
    zTreeOnClick: function () {

    },
    zTreeOnAsyncSuccess: function () {

    },showRMenu: function(type, x, y) {

        $("#rMenu ul").show();

        if (type=="root") {

          $("#m_del").hide();

          $("#m_check").hide();

          $("#m_unCheck").hide();

        } else {

          $("#m_del").show();

          $("#m_check").show();

          $("#m_unCheck").show();

        }

        $("#rMenu").css({"top":y-50+"px", "left":x-160+"px", "display":"block"});
        $("body").bind("mousedown", function (event){

          if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
            $("#rMenu").css({"display" : "none"});
          }

        });

      }
  }
  }
</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;

  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

  }

 .treetip {
    color: black;
    width: 95%;
    border-bottom: solid 1px #ccc;
    text-align: center;
  }

/*  .ztree {
    overflow-y: scroll;
    height: 100%;
  }*/

  div#rMenu {
    position: absolute;
    display: none;
    top: 0;
    z-index: 999;
    text-align: left;
    padding: 2px;
  }

  div#rMenu ul {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  }

  div#rMenu ul li {

    margin: 1px 0;

    padding: 0 5px;

    cursor: pointer;

    list-style: none outside none;
  }
</style>
