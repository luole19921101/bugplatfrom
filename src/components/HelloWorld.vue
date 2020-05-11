<template>
  <div id="app">
    <el-container>
    <el-aside width="200px">
      <div style="text-align:center;padding-top:20px;padding-buttom:20px;">
        <el-row>
          <el-col span="24">
            <span style="font-size:20px;font-weight: 900;font-family:'Tahoma'">个人信息</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-avatar  size="100px"  src="http://localhost:8080/static/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-tag>管理员</el-tag>
            <span style="font-size:12px;font-weight: 500;font-family:'Tahoma'">罗乐，男，江西</span>
          </el-col>
        </el-row>
      </div>
      <el-menu
        default-active="2"
        active-text-color="#ffd04b"
        style="padding-top:20px"
        class="el_ui_my">
        <el-menu-item index="1" @click="addTab('新增缺陷','/insert')">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">新增缺陷</span>
        </el-menu-item>
        <el-menu-item index="2" @click="addTab('查看缺陷','/showbug')">
          <i class="el-icon-s-grid"></i>
          <span slot="title">查看缺陷</span>
        </el-menu-item>
        <el-menu-item index="3" @click="addTab('统计缺陷','/insert')">
          <i class="el-icon-s-data"></i>
          <span slot="title">统计缺陷</span>
        </el-menu-item>
        <el-menu-item index="4" @click="addTab('用户缺陷','/insert')">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="60px" style="text-align:right">
    <el-row style="padding-top:20px">
      <el-col span="18" style="text-align:left">
        <el-row>
          <el-col span="24">
            <span style="font-size:18px;font-weight: 900;font-family:'Tahoma'">您好，罗乐</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <span style="font-size:12px;font-weight: 500;font-family:'Tahoma';color:#BDBDC1">这是您的个人BUG平台</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col span="3">
        <el-badge :value="1000" :max="99" >
          <el-button type="primary" @click="drawer = true" icon="el-icon-chat-line-round" >在线聊天</el-button>
        </el-badge>
      </el-col>
      <el-col span="3">
        <el-button type="danger" >退出系统</el-button>
      </el-col>
    </el-row>
    
    
  </el-header>
      <el-main ref="main">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" >
          <el-tab-pane
            v-for="(item) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            style="background-color: #FAF9FF;color:#ffffff"
            text-color="#fff"
          >
          
          <iframe :src.sync="item.content" ref="iframe" style="width: 100%;" :height="frameHeight" frameborder="0"></iframe>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>

<el-drawer
  title="我是标题"
  :visible.sync="drawer"
  :with-header="false">
  <span>在线聊天窗口</span>
</el-drawer>
  </div>
</template>


<script>
export default {
  data() {
      return {
        editableTabsValue: '1',
        editableTabs: [],
        tabIndex: 4,
        frameHeight: 0,
        drawer:false
      }
    },
    methods: {
      addTab(targetName,url) {
        console.log(this.$refs.main.$el.clientHeight);
        this.frameHeight=this.$refs.main.$el.clientHeight-100;
        let tabs = this.editableTabs;
        let exist=false;
        tabs.forEach((tab, index) => {
          if(tab.name==targetName){
            exist=true;
            this.editableTabsValue = targetName;
          }
        });
        if(!exist){
          this.editableTabs.push({
            title: targetName,
            name: targetName,
            content: this.$router.app.$el.baseURI.split('#')[0]+'#'+url
          });
          this.editableTabsValue = targetName;
        }
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },mounted(){
      this.addTab("首页","/indexshow");
    }
}
</script>
<style>
  .el-header, .el-footer {
    color: rgb(36, 34, 34);
    background-color: #FAF9FF;
  }
  
  .el-aside {
    color: #333;
    background: -moz-linear-gradient(top, #36FFF6 0%, #50ACFF 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#36FFF6), color-stop(100%,#50ACFF));
    background: -webkit-linear-gradient(top, #36FFF6 0%,#50ACFF 100%);
    background: -o-linear-gradient(top, #36FFF6 0%,#50ACFF 100%);
    background: -ms-linear-gradient(top, #36FFF6 0%,#50ACFF 100%);
    background: linear-gradient(to bottom, #36FFF6 0%,#50ACFF 100%);
  }
  
  .el-main {
    background-color: #FAF9FF;
    color: #333;
  }
  
  html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }

  .el-tabs__nav .el-tabs__item:nth-child(1) span{
    display: none;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
    
  }
  .el_ui_my{
    background:transparent;
  }   
</style>