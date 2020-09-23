<template>
    <div class="application content-margin">
        <side-bar :title='title' :content='content' @changeContent='change'></side-bar>
        <div class="apply-content">
            <div class="img"><img src='~assets/img/seven.jpg'/></div>
            <!-- 社团申请表 -->
            <div  v-if='showContentIndex===0' class="writecontent">
                <div class="write-title">社团申请</div>
                <el-form :model="applicationform"  ref='applicationformref' :rules='rules' label-width="100px" size='mini' class='form'>
                    <el-form-item label="社团名称"  prop='massname'>
                        <el-input v-model="applicationform.massname" autocomplete="off" placeholder='请输入社团名称'></el-input>
                    </el-form-item>
                    <el-form-item label="社团类型"  prop='type'>
                        <el-select v-model="applicationform.type" placeholder="请选择社团类型">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <!-- <el-input v-model="applicationform.type" autocomplete="off" placeholder='请输入社团类型'></el-input> -->
                    </el-form-item>
                    <el-form-item label="发起人姓名"  prop='name'>
                        <el-input v-model="applicationform.name" autocomplete="off" placeholder='请输入发起人姓名'></el-input>
                    </el-form-item>
                    <el-form-item label="发起人手机" prop='tel'>
                        <el-input v-model="applicationform.tel"  autocomplete="off" placeholder='请输入发起人手机'></el-input>
                    </el-form-item>
                    <el-form-item label="Email"  prop='email'>
                        <el-input v-model="applicationform.email" autocomplete="off" placeholder='请输入Email'></el-input>
                    </el-form-item>
			    </el-form>
                <el-button type='primary' @click='applicationSubmit' class='button'>提交申请</el-button>
            </div>
            <!-- 社团申请状态 -->
            <div v-else class="showcontent" >

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
                massname:'',
                type:'',
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
                massname: [
                    { required: true, message: '请输入社团名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择社团类型', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入发起人姓名', trigger: 'blur' }
                ],
                // 自定义校验
                tel: [{ validator: validatePass, trigger: 'blur' }],
                email: [
                    { required: true, message: '请输入email', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的email', trigger: 'blur' }
                ]
            }
        }
    },
    components:{
        SideBar
    },
    methods:{
        // 内容切换，社团申请与申请状态
        change(index){
            this.showContentIndex=index
        },
        // 点击button发送请求 （申请社团请求）
        applicationSubmit(){
            this.$refs.applicationformref.validate(valid=>{
                this.$http.post('/applyFor',this.applicationform).then((res)=>{
                    console.log(res)
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
.application{
    display: flex;
    justify-content: space-between;
    .apply-content{
        .img{
            height: 200px;
            overflow: hidden;
        }
        .writecontent{
            .write-title{
                padding:20px 10px;
                border-bottom:1px solid #ccc;
            }
            .form{
                margin:20px 0 0 110px;
                width:400px;
            }
            .button{
                margin-left:600px;
            }
        }
    }
}
</style>