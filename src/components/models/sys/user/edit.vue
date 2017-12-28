<template>
  <el-dialog title="新增用户" :visible.sync="dialogFormVisible" v-bind:before-close="refreshDad">
     <el-form :model="form" :rules="rules">
      <el-form-item label="登录名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
         <el-input v-model="form.password" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="姓名" :label-width="formLabelWidth"  prop="realname">
         <el-input v-model="form.realname" auto-complete="off"></el-input>
       </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
        <el-radio v-model="form.sex" label="1">男</el-radio>
        <el-radio v-model="form.sex" label="2">女</el-radio>
      </el-form-item>
       <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
         <el-input v-model="form.phone" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="邮箱" :label-width="formLabelWidth">
         <el-input v-model="form.email" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="状态" :label-width="formLabelWidth"  prop="locked">
         <el-radio v-model="form.locked" label="1">启用</el-radio>
         <el-radio v-model="form.locked" label="2">禁用</el-radio>
       </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>

</template>
<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          username: '',
          password: '1',
          realname: '',
          sex: '',
          phone: '',
          email: '',
          locked: ''
        },
        formLabelWidth: '120px',
        rules: {
          username: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          realname: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          locked: [
            { required: true, message: '请选择状态'  }
          ]
        }
      };
    },
    methods:{
      refreshDad:function (done) {
        this.$emit('dadrefresh');
        done();
      },
      submit:function () {

        var inner_url = server_host + "upms/user/create";
        this.$http.post(inner_url, this.form,{emulateJSON:false}).then(
          function (res) {
            if (200 === res.body.state) {
              this.$emit('dadrefresh');
              /*重置form中的内容*/
              this.form={
                username: '',
                  password: '1',
                  realname: '',
                  sex: '',
                  phone: '',
                  email: '',
                  locked: ''
              }
              this.dialogFormVisible = false;
            } else if (500 === res.body.state) {
              alert(res.body.data.message);
            }
          }, function (res) {

          }
        )

      }

    }
  };
</script>

<style scoped>

</style>
