<template>
    <div ref="div">
        <el-row class="row-bg">
            <el-col span="6">
                    编号
                    <el-input v-model="bugSearch.id" style="width:150px" size="mini"></el-input>
                    
            </el-col>
            <el-col span="6">
                    模块
                    <el-input v-model="bugSearch.mk" style="width:150px" size="mini"></el-input>
                    
            </el-col>
            <el-col span="6">
                功能名称
                    <el-input v-model="bugSearch.gnmc" style="width:150px" size="mini"></el-input>
                    
            </el-col>
            <el-col span="6">
                    提出人
                    <el-input v-model="bugSearch.tcr" style="width:150px" size="mini"></el-input>
                    
            </el-col>
        </el-row>
        <el-row class="row-bg">
            <el-col span="6">
                    提出日期
                    <el-input v-model="bugSearch.rq" style="width:150px" size="mini"></el-input>
                    
            </el-col>
            <el-col span="6">
                    状态
                    <el-input v-model="bugSearch.zt" style="width:150px" size="mini"></el-input>
                    
            </el-col>
            <el-col span="6">
                    处理人
                    <el-input v-model="bugSearch.clr" style="width:150px" size="mini"></el-input>
                    
            </el-col>
            <el-col span="6">
                <el-button type="primary" size="mini" @click="searchBug" icon="el-icon-search">查询</el-button>
                    
            </el-col>
        </el-row>
        <el-row class="row-bg">
            <el-col span="24">    
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
                        <el-table-column fixed="right" label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="edit(scope.$index, tableData)"
                                size="mini">
                                修改
                                </el-button>
                            </template>
                        </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-pagination
            v-show="isPage"
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-size="page.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="page.totalSize"
            background
            style="float:right;margin:10px 20px 0 0;">
        </el-pagination>

        <el-dialog title="修改" :visible.sync="dialogFormVisible">
            <el-form :model="bugEdit">
                <el-form-item label="序号" :label-width="formLabelWidth">
                    <label>{{bugEdit.id}}</label>
                </el-form-item>
                <el-form-item label="问题描述" :label-width="formLabelWidth">
                    <label>{{bugEdit.wtms}}</label>
                </el-form-item>
                <el-form-item label="处理时间" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="bugEdit.clsj"
                        align="right"
                        type="date"
                        placeholder="选择日期" size="small">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="处理人" :label-width="formLabelWidth">
                    <el-input v-model="bugEdit.clr" autocomplete="off" style="width:150px" size="small"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="bugEdit.zt" placeholder="请选择状态" size="small">
                        <el-option label="已反馈，未解决" value="已反馈，未解决"></el-option>
                        <el-option label="已解决" value="已解决"></el-option>
                        <el-option label="解决完成，验证通过" value="解决完成，验证通过"></el-option>
                        <el-option label="解决完成，验证未通过" value="解决完成，验证未通过"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="bugEdit.bz" type="textarea" size="small" maxlength="500" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
            
</template>

<script>
import ElementUI from 'element-ui';
import hello from '@/components/HelloWorld';
export default {

    data() {
        return {
            searchKeys:{},
            page: {
                pageNum: 1, // 当前页
                pageSize: 10, // 每页显示条目个数
                totalSize: 0 // 总条目数
            },
            bugSearch:{
                id:'',
                gnmc:'',
                mk:'',
                tcr:'',
                rq:'',
                zt:'',
                clr:''
            },
            bugEdit:{
                id:'',
                gnmc:'',
                mk:'',
                tcr:'',
                rq:'',
                zt:'',
                clr:'',
                clsj:new Date(),
                bz:''
            },
            tableHeight:500,
            tableData:[],
            isPage:true,
            dialogFormVisible: false,
            formLabelWidth: '120px'
        };
    },methods:{
        getTableData(val) {
            var __this=this;
            this.$axios({
                method:'post',
                data: {
                    pageNum:val,
                    pageSize:this.page.pageSize,
                    id:this.bugSearch.id,
                    gnmc:this.bugSearch.gnmc,
                    mk:this.bugSearch.mk,
                    tcr:this.bugSearch.tcr,
                    rq:this.bugSearch.rq,
                    zt:this.bugSearch.zt,
                    clr:this.bugSearch.clr
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
        },
        handleCurrentChange(val) {
            this.getTableData(val)
        },
        searchBug(){
            this.getTableData(1)
        },edit(index,row){
            console.log(row[index].wtms);
            this.bugEdit.id=row[index].id;
            this.bugEdit.wtms=row[index].wtms;
            this.bugEdit.bz=row[index].bz;
            this.dialogFormVisible=true;
            
        },tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 0) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        }
    },mounted() {  
        this.getTableData(1);
    }
}
</script>

<style>
  .row-bg {
    padding: 10px 0;
    text-align: center;
  }

  .el-table .warning-row {
    background: #F2F7FD;
  }

  .el-table .success-row {
    background: #FFFFFF;
  }
</style>