<template>
    <div>
        <el-form :model="dengmiQueryForm" ref="bugForm" label-width="100px" label-position="right">
            <el-row>
                <el-col span="8">
                    <el-form-item label="需求点编号">
                        <el-input v-model="bugForm.xqdbh" style="width:250px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="8">
                    <el-form-item label="模块">
                        <el-input v-model="bugForm.mk" style="width:250px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="8">
                    <el-form-item label="功能名称">
                        <el-input v-model="bugForm.gnmc" style="width:250px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col span="16">
                <el-form-item label="问题类型">
                  <el-radio-group v-model="bugForm.wtlx">
                    <el-radio label="改进功能" border>改进功能</el-radio>
                    <el-radio label="功能故障" border>功能故障</el-radio>
                    <el-radio label="改进优化" border>改进优化</el-radio>
                    <el-radio label="其他" border>其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col span="8">
                    <el-form-item label="优先级">
                        <el-select v-model="bugForm.value" clearable placeholder="请选择"  style="width:250px">
                          <el-option
                            v-for="item in bugForm.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col span="8">
                    <el-form-item label="返回结果">
                        <el-input v-model="bugForm.zuozhe" style="width:250px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="8">
                    <el-form-item label="提出人">
                        <el-input v-model="bugForm.tcr" style="width:250px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="问题描述">
                  <el-input type="textarea" v-model="bugForm.wtms"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="操作步骤">
                  <el-input type="textarea" v-model="bugForm.czbz"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="bugForm.bz"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button type="primary" @click="submitForm" icon="el-icon-s-claim">提交</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import ElementUI from 'element-ui';
export default {
  data() {
    return {
      bugForm: {
        xqdbh:'',
        mk:'',
        gnmc:'',
        wtlx:'',
        yxj:'',
        fhjg:'',
        tcr:'',
        wtms:'',
        czbz:'',
        bz:'',
        options: [{
          value: '低',
          label: '低'
        }, {
          value: '中',
          label: '中'
        }, {
          value: '高',
          label: '高'
        }]
      }
    }
  },
  methods: {
    submitForm() {
      console.log('submit!');
      console.log(this.bugForm.wtlx);
      console.log(this.bugForm.value);
      console.log(this.bugForm.mk);
      this.$axios({
        method:'get',
        params: {
          xqdbh:this.bugForm.xqdbh,
          mk:this.bugForm.mk,
          gnmc:this.bugForm.gnmc,
          wtlx:this.bugForm.wtlx,
          fhjg:this.bugForm.fhjg,
          tcr:this.bugForm.tcr,
          wtms:this.bugForm.wtms,
          czbz:this.bugForm.czbz,
          bz:this.bugForm.bz,
          yxj:this.bugForm.value
        },
        url:'http://localhost:8088/Bug/addBug'
      }).then(function(res){
          console.log(res);
          var result='';
          if(res.data == 'success'){
            result='添加bug成功！'
          }else{
            result='添加bug失败';
          }
          ElementUI.Message({
            showClose: true,
            message: result,
            type: 'success'
          });
      }).catch(function(error){
          console.log(error);
          ElementUI.Message({
            showClose: true,
            message: '添加bug失败：'+error,
            type: 'error'
          });
      });
    }
  }
}
</script>

<style>
  
</style>