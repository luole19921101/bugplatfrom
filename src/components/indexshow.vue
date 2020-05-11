<template>
    <div>
      <el-row :gutter="20">
        <el-col span="8">
          <el-card shadow="always">
            <div slot="header" style="background: #409EFF;">
              <span>综合七日新增缺陷数</span>
              <el-button style="float: right; padding: 3px 0" type="primary" size="small" icon="el-icon-refresh" @click="refreshSevenDaysSumData"></el-button>
            </div>
            <div id="myChart" :style="{width: '100%', height: '200px',float:top}" :body-style="{ padding: '0px' }"></div>
          </el-card>
        </el-col>
        <el-col span="8">
          <el-card shadow="always">
            <div slot="header">
              <span>个人七日新增缺陷数</span>
              <el-button style="float: right; padding: 3px 0" type="primary" size="small" icon="el-icon-refresh"></el-button>
            </div>
            <div id="myChart1" :style="{width: '100%', height: '200px',float:top}" :body-style="{ padding: '0px' }"></div>
          </el-card>
        </el-col>
        <el-col span="8">
          <el-card shadow="always">
            <div slot="header">
              <span>今日个人汇总</span>
              <el-button style="float: right; padding: 3px 0" type="primary" size="small" icon="el-icon-refresh"></el-button>
            </div>
            <div id="myChart2" :style="{width: '100%', height: '200px',float:top}" :body-style="{ padding: '0px' }"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="padding-top:30px">
        <el-col span="24">
          <el-card shadow="always">
            <div slot="header">
              <span>缺陷查看</span>
              <el-button style="float: right; padding: 3px 0" type="primary" size="small" icon="el-icon-refresh" @click="refreshBug"></el-button>
            </div>
              <el-table :data="tableData" border="" style="width: 100%;"  size="mini" :row-class-name="tableRowClassName">
                        <el-table-column fixed prop="id" label="编号" width="60"></el-table-column>
                        <el-table-column prop="xqdbh" label="需求点编号" width="120"></el-table-column>
                        <el-table-column prop="mk" label="模块" width="200"></el-table-column>
                        <el-table-column prop="gnmc" label="功能名称" width="200"></el-table-column>
                        <el-table-column prop="wtlx" label="问题类型" width="150"></el-table-column>
                        <el-table-column prop="wtms" label="问题描述" width="350"></el-table-column>
                        <el-table-column prop="yxj" label="优先级"></el-table-column>
                        <el-table-column prop="czbz" label="操作步骤" width="300"></el-table-column>
                        <el-table-column prop="fhjg" label="返回结果" width="150"></el-table-column>
                        <el-table-column prop="rq" label="日期" width="150"></el-table-column>
                        <el-table-column prop="tcr" label="提出人" width="120"></el-table-column>
                        <el-table-column prop="clsj" label="处理时间" width="150"></el-table-column>
                        <el-table-column prop="clr" label="处理人" width="120"></el-table-column>
                        <el-table-column prop="zt" label="状态" width="180"></el-table-column>
                        <el-table-column prop="bz" label="备注" width="300"></el-table-column>
                        
                </el-table>
                <el-pagination
                  v-show="isPage"
                  @current-change="handleCurrentChange"
                  :current-page="page.pageNum"
                  :page-size="page.pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="page.totalSize"
                  background
                  style="float:right;margin:10px 20px 0 0;padding-buttom:10px">
              </el-pagination>
          </el-card>
        </el-col>
      </el-row>
        
    </div>
</template>

<script>
import ElementUI from 'element-ui';
export default {
  data() {
    return {
      insertChartData:[],
      insertChartDataX:[],
      insertChartDataSelf:[23,15,19,23,4,11,2],
      tableData:[],
      page: {
                pageNum: 1, // 当前页
                pageSize: 10, // 每页显示条目个数
                totalSize: 0 // 总条目数
      },
      isPage:true
    }
  },
  methods: {
    
    drawLine () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(
          document.getElementById('myChart')
        )
        let myChart1 = this.$echarts.init(
          document.getElementById('myChart1')
        )
        let myChart2 = this.$echarts.init(
          document.getElementById('myChart2')
        )
        // 绘制图表
        myChart.setOption({
          color: ['#3398DB'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              top: '4%'
          },
          xAxis: [
              {
                  type: 'category',
                  data: this.insertChartDataX,
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: [
              {
                  name: '直接访问',
                  type: 'bar',
                  barWidth: '60%',
                  data: this.insertChartData
              }
          ]
        });
        myChart1.setOption({
          color: ['#3398DB'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              top: '4%'
          },
          xAxis: [
              {
                  type: 'category',
                  data: ['5月4','5月5','5月6','5月7','5月8','5月9','5月10'],
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: [
              {
                  name: '直接访问',
                  type: 'bar',
                  barWidth: '60%',
                  data: this.insertChartDataSelf
              }
          ]
        });
        myChart2.setOption({
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              orient: 'horizontal',
              left: 0,
              data: ['新增', '待验证', '验证通过', '验证未通过']
          },
          series: [
              {
                  name: '数量',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '15',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: 335, name: '新增'},
                      {value: 310, name: '待验证'},
                      {value: 234, name: '验证通过'},
                      {value: 135, name: '验证未通过'}
                  ]
              }
          ]
        });
      },tableRowClassName({row, rowIndex}) {
          if (rowIndex%2 === 0) {
              return 'warning-row';
          } else {
              return 'success-row';
          }
          return '';
      },getTableData(val) {
            var __this=this;
            this.$axios({
                method:'post',
                data: {
                    pageNum:val,
                    pageSize:this.page.pageSize
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8;"
                },
                url:'http://localhost:8088/Bug/findPage'
            }).then(function(res){
                console.log(res.data.pageNum+'---'+res.data.pageSize+'---'+res.data.totalSize);
                __this.tableData=res.data.content;
                __this.page.pageNum=res.data.pageNum;
                __this.page.pageSize=res.data.pageSize;
                __this.page.totalSize=res.data.totalSize;
            }).catch(function(error){
                console.log(error);
            });
        },handleCurrentChange(val) {
            this.getTableData(val)
        },refreshBug(){
            this.getTableData(1)
        },findSevenDaysSumData(){
            var __this=this;
            this.$axios({
                method:'post',
                headers: {
                    "Content-Type": "application/json;charset=utf-8;"
                },
                url:'http://localhost:8088/Bug/findSevenDaysSumData'
            }).then(function(res){
                console.log(res.data[0]);
                __this.insertChartDataX=res.data[0];
                __this.insertChartData=res.data[1];
                __this.drawLine();
            }).catch(function(error){
                console.log(error);
            });
        },refreshSevenDaysSumData(){
            this.findSevenDaysSumData()
        }
      
  },
  mounted(){
    this.getTableData(1);
    this.findSevenDaysSumData();
    
  }
}
</script>

<style>
.el-card__header {
    background-color: #409EFF;
}
.el-table .warning-row {
    background: #F2F7FD;
  }

.el-table .success-row {
    background: #FFFFFF;
}

body{
  overflow-x:hidden;
  overflow-y:auto;
}
</style>