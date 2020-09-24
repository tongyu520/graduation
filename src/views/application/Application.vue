<template>
    <div class="application content-margin">
        <side-bar :title='title' :content='content' @changeContent='change'></side-bar>
        <div class="apply-content">
            <div class="img"><img src='~assets/img/seven.jpg'/></div>
            <!-- 社团申请表 -->
            <div  v-if='showContentIndex===0' class="writecontent">
                <div class="write-title">社团申请</div>
                <el-form :model="applicationform"  ref='applicationformref' :rules='rules' label-width="100px" size='mini' class='form'>
                    <el-form-item label="社团类型"  prop='type'>
                        <el-select v-model="applicationform.type" placeholder="请选择社团类型">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="社团名称"  prop='massname'>
                        <el-input v-model="applicationform.massname" autocomplete="off" placeholder='请输入社团名称'></el-input>
                    </el-form-item>
                    <el-form-item label="申请人姓名"  prop='name'>
                        <el-input v-model="applicationform.name" autocomplete="off" placeholder='请输入申请人姓名'></el-input>
                    </el-form-item>
                    <el-form-item label="申请人专业"  prop='major'>
                        <el-input v-model="applicationform.major" autocomplete="off" placeholder='请输入申请人专业'></el-input>
                    </el-form-item>
                    <el-form-item label="申请人手机" prop='tel'>
                        <el-input v-model="applicationform.tel"  autocomplete="off" placeholder='请输入申请人手机'></el-input>
                    </el-form-item>
                    <el-form-item label="Email"  prop='email'>
                        <el-input v-model="applicationform.email" autocomplete="off" placeholder='请输入Email'></el-input>
                    </el-form-item>
			    </el-form>
                <el-button type='primary' @click='applicationSubmit' class='button'>提交申请</el-button>
            </div>
            <!-- 社团申请状态 -->
            <div v-else class="showcontent" >
                <div class="write-title">社团申请状态</div>
                <el-table ref="filterTable" :data="tableData" style="width: 100%" border size='small' > 
                    <el-table-column
                        prop="massname"
                        label="社团名称"
                        width="180"
                        column-key="date">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="申请人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="major"
                        label="申请人专业"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="手机号码">
                    </el-table-column>
                    <el-table-column
                        label="申请状态"
                        width="100"
                        filter-placement="bottom-end"
                        align='center'>
                        <template>
                            <el-tag
                            type='primary'
                            disable-transitions>通过</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页区-->
                <el-pagination 
                @current-change="handleCurrentChange"
                :current-page="query.page"
                layout=" prev, pager, next"
                :total="1000"
                background
                class='page'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import SideBar from 'components/common/SideBar'
export default {
    data(){
        // 手机号码的自定义验证规则
        var validatePass=(rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            }else if((/^1[3456789]\d{9}$/.test(value))){
                callback()
            }else {
                return callback(new Error('请输入正确的手机号码'))
            }
        }
        return{
            title:'申请社团',
            content:['社团申请','社团申请状态'],
            // 默认展示社团申请
            showContentIndex:0,
            applicationform:{
                type:'',
                massname:'',
                major:'',
                name:'',
                tel:'',
                email:''
            },
            options: [{
                value: '艺术类'
                }, 
                {
                value: '体育类'
                }, 
                {
                value: '公益类'
                },
                 {
                value: '企业俱乐部'
                },
                {
                value: '科技类'
                },
                {
                value: '语言文化类'
                }],
            rules: {
                type: [
                    { required: true, message: '请选择社团类型', trigger: 'change' }
                ],
                massname: [
                    { required: true, message: '社团名称不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '申请人姓名不能为空', trigger: 'blur' }
                ],
                major: [
                    { required: true, message: '申请人专业不能为空', trigger: 'blur' }
                ],
                // 自定义校验
                tel: [{ validator: validatePass, trigger: 'blur' }],
                email: [
                    { required: true, message: 'email不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的email', trigger: 'blur' }
                ]
            },
            // 申请表中的数据
            tableData:[],
            tag:{},
            // 页码的值
            query:{
                page:1
            },
        }
    },
    components:{
        SideBar
    },
    created(){
        // 组件创建时，调用接口，获取申请状态数据
        this.getApplyStatus()
    },
    methods:{
        // 内容切换，社团申请与申请状态
        change(index){
            this.showContentIndex=index
        },
        // 点击button发送请求 （申请社团请求）
        applicationSubmit(){
            this.$refs.applicationformref.validate(valid=>{
                if(!valid) return;
                this.$http.post('/applyFor',this.applicationform).then((res)=>{
                    if(res.data.isSuccess){
                        // 刷新社团申请状态的展示
                        this.getApplyStatus()
                        this.$message.success('申请成功')
                    }else{
                        this.$message.error('每个用户只能申请一个社团！')
                    }
                })
            })
        },
        // 申请状态数据
        getApplyStatus(){
            this.$http.get('/status',{'params':{page:this.query.page}}).then((res)=>{
                this.tableData=res.data
                console.log(res)
            })
        },
        //	监听页码值改变的事件
        handleCurrentChange(newSize){
            this.query.page=newSize
            this.getApplyStatus()
        },
    }
}
</script>
<style lang="less" scoped>
.application{
    display: flex;
    justify-content: space-between;
    .apply-content{
        .write-title{
            padding:20px 10px;
            border-bottom:1px solid #ccc;
        }
        .img{
            height: 200px;
            overflow: hidden;
        }
        .writecontent{
            .form{
                margin:20px 0 0 110px;
                width:400px;
            }
            .button{
                margin-left:600px;
            }
        }
        .showcontent{
            .page{
                margin:20px 0 0 300px;
            }
        }
    }
}
</style>