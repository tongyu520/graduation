<template>
    <div class="navbar">
        <!-- logo图标部分 -->
        <div class="navbar-logo">
            <div class="logo-left">
                <img src="~assets/img/home.jpg">
                <span>成都理工大学工程技术学院社团网站</span>
            </div>
            <div class="logo-right">
                <el-button type='info' @click='loginOut'>退出</el-button>
            </div>
        </div>
        <!-- 导航条部分 -->
        <div class="navbar-items">
            <div v-for='(item,index) in navItem' :key="item" class="item" @click=itemClick(index)>{{item}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            navItem:['首页','社团快讯','社团活动','社团检索','资料下载','规章制度','申请社团'],
            paths:['/home','/news','/elegant','/search','/down','/rules','application']
        }
    },
    methods:{
        // 监听导航条索引点击事件，改变路由
        itemClick(index){
            this.$router.replace(this.paths[index])
        },
        // 点击退出按钮，退回到login页面
        loginOut(){
            this.$router.replace('/login')
        }
    }
}
</script>
<style lang="less" scoped>
    .navbar-logo{
        display: flex;
        justify-content:space-between;
        padding:10px 0;
        .logo-left{
            font-weight:540;
            font-size: 19px;
            img{
                vertical-align:middle;
                width: 87px;
                height: 55px;
            }
        }
        .logo-right{
            line-height: 55px;
        }
    }
    .navbar-items{
        display: flex;
        background: #409EFF;
        .item{
            flex:1;
            text-align: center;
            height:37px;
            line-height:37px;
            color:#fff;
        }
        .item:hover{
            background-color:#9ec3fa;
            cursor: pointer;
        }
    }
</style>