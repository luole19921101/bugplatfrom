<template>
  <div>
    <div style="display: flex;justify-content: center;margin-top: 200px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户登陆</span>
        </div>
        <table align="center">
          <tr>
            <td style="height:80px">用户名</td>
            <td>
              <el-input v-model="user.username"  placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <tr>
            <td style="height:40px">密码</td>
            <td>
              <el-input type="password" v-model="user.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2"  style="height:80px">
              <el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return{
        user:{
          username:'',
          password:''
        }
      }
    },methods:{
      doLogin(){
        this.$router.push({ path: '/hello' })
      }
    }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  .div {
    text-align: center;
    align-content: center;
  }
</style>