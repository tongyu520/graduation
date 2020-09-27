<template>
    <div class="search">
        <div class="type same">
            <div class="type-title">社团类别:</div>
            <div class="item" v-for='(item,index) in typeName' :key='item' @click='itemClick(index)' :class='{active:index===ind}'>{{item}}</div>
        </div>
        <div class="input">
            <div class="input-title">社团名称:</div>
            <div class="input-item">
                <el-input  v-model="inputContent" size='mini'>
                    <el-button slot="append" icon="el-icon-search" @click='showContent'></el-button>
                </el-input>
            </div>
        </div>
        <div class="choose same">
            <div class="choose-title one">已选条件:</div>
            <div class="choose-item one">{{options}}</div>
            <div class="choose-item" :class="{one:showInputContent!==''}">{{showInputContent}}</div>
        </div>
        <div class="showResult">
            <el-table
                :data="tableResult"
                style="width: 800px; margin-left:100px;">
                <el-table-column
                    prop="massname"
                    label="名称"
                    width="280">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类别"
                    width="280">
                </el-table-column>
                <el-table-column align='center' label="简介"><a href='#'>[下载]</a></el-table-column>
            </el-table>
             <!--分页区-->
            <el-pagination 
            @current-change="handleCurrentChange"
            :current-page="query.page"
            layout=" prev, pager, next"
            :total="1000"
            class='page'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            typeName:['全部','艺术类','体育类','公益类','企业俱乐部','科技类','语言文化类'],
            ind:0,
            inputContent:'',
            showInputContent:'',
            tableResult:[],
            // 页码的值
            query:{
                page:1
            },
        }
    },
    created(){
        this.getTableResult()
    },
    computed:{
        options(){
            return this.typeName[this.ind]
        }
    },
    methods:{
        itemClick(index){
            this.ind=index
            this.getTableResult()
        },
        // 展示输入框中输入的值
        showContent(){
            this.showInputContent=this.inputContent
            //清空输入框
            this.inputContent=''
            this.getTableResult()
        },
        // 获取检索数据
        getTableResult(){
            if(this.options==='全部'&&this.showInputContent===''){
                this.$http.post('/result',{page:{pageNum:this.query.page}}).then((res)=>{
                    this.tableResult=res.data
                })
            }else if(this.options==='全部'&&this.showInputContent!==''){
                this.$http.post('/result',{page:{pageNum:this.query.page},obj:{massname:this.showInputContent}}).then((res)=>{
                    this.tableResult=res.data
                })
            }else if(this.options!=='全部'&&this.showInputContent==''){
                this.$http.post('/result',{page:{pageNum:this.query.page},obj:{type:this.options}}).then((res)=>{
                    this.tableResult=res.data
                })
            }else if(this.options!=='全部'&&this.showInputContent!==''){
                this.$http.post('/result',{page:{pageNum:this.query.page},obj:{massname:this.showInputContent,type:this.options}}).then((res)=>{
                    this.tableResult=res.data
                })
            }
            
        },
        //	监听页码值改变的事件
        handleCurrentChange(newSize){
            this.query.page=newSize
            this.getTableResult()
        },
    }
}
</script>
<style lang="less" scoped>
.search{
    font-size: 12px;
    .same{
        display: flex;
        padding:10px 0;
    }
    .type{
        border-bottom: 1px solid #eee;
        div{
            padding:5px 15px;
        }
        .item{
            color:#0957a5;
            margin-right:10px;
        }
        .item:hover{
            background-color:#dfe8f7 ;
            cursor: pointer;
            color:#409EFF;
        }
        .active{
            color:#fff !important;
            background-color: #409EFF !important;
        }
    }
    .input{
        border-bottom: 1px solid #eee;
        display: flex;
        .input-title {
            line-height: 37.6px;
            padding:5px 15px;
        }
        .input-item{
            padding:10px 0px;
        }
    }
    .choose{
        .one{
            padding:5px 15px;
        }
        .choose-item{
            color:#fff;
            background-color: #409EFF;
            margin-right:10px;
        }
    }
    .showResult{
        .page{
            margin:20px 0 20px 400px;
        }
    }
    
}
</style>