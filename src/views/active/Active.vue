<template>
    <div class="active boxFlex content-margin">
        <side-bar title="活动" :content="['社团活动']"></side-bar>
        <div class="active-box">
            <div class="image"><img src="~assets/img/four.jpg" alt=""></div>
            <div class="content">
                <div class="title" v-if='isShowList'>社团活动</div>
                <div class="title" v-else>{{titleContent}}活动详情</div>
                <!-- 活动列表 -->
                <div class="active-list" v-if='isShowList'>
                    <div class="list-content" v-for='(item,index) in PageActiveList' :key='item.title'>
                        <div class="list-title pb"  @click='showActiveDetail(index)'>{{item.title}}</div>
                        <div class="time-space pb list-same">时间地点：
                            <span class='time'>{{item.time}}</span>
                            <span class='space'>{{item.space}}</span>
                        </div>
                        <div class="easy-comment pb list-same">
                            活动简介：{{item.comment}}
                        </div>
                    </div>
                     <!--分页区-->
                    <el-pagination 
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    layout=" prev, pager, next"
                    :total="1000"
                    background
                    class='page'>
                    </el-pagination>
                </div>
                <!-- 活动详情 -->
                <div class="active-detail" v-else>
                    <div class="detail-content">
                        <div class="detail-title">{{titleContent}}</div>
                        <div class="major"></div>
                        <div class="mass"></div>
                        <div class="active-time"></div>
                        <div class="people"></div>
                        <div class="phone"></div>
                        <div class="active-content"></div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SideBar from 'components/common/SideBar'
export default {
    components:{
        SideBar
    },
    data(){
        return{
            isShowList:true,
            titleContent:'',
            activeList:[
                {title:'纸鸢书院分社 “一起读书 懒癌克服”读书结伴打卡活动',time:'2020-9-7',space:'线上举办',comment:''},
                {title:'日语协会观影活动',time:'2020-4-2',space:'一教B302',comment:''},
                {title:'环保志愿者协会“为它代言 拒绝表演”公益海报全国高校巡展',time:'2020-5-24',space:'线上举办',comment:''},
                {title:'戏曲角',time:'2020-7-26',space:'线上举办',comment:''},
                {title:'环保志愿者协会第十三届观鸟节',time:'2020-7-1',space:'线上举办',comment:''},
                {title:'环保志愿者协会环保纪录片公映活动',time:'2020-9-27',space:'线上举办',comment:''},
                {title:'雷雨话剧社2019-2020秋季学期期末戏《红玫瑰与白玫瑰》演出',time:'2020-1-1',space:'线上举办',comment:''},
                {title:'韩语小课堂',time:'2020-9-27',space:'线上举办',comment:''},
                {title:'教授茶座',time:'2020-11-10',space:'线上举办',comment:''},
                {title:'3D打印技术及应用协会建模培训(第四周）',time:'2020-9-27',space:'线上举办',comment:''},
                {title:'2019全国“互联网+”大学生创新创业大赛经验分享',time:'2020-2-13',space:'线上举办',comment:''},
                {title:'BOBO街舞协会2015届会员动员大会',time:'2020-8-1',space:'艺术学院舞蹈教室',comment:''}
            ],
            page:1
        }
    },
    computed:{
        // 手动实现分页，点击分页按钮，改变page值，改变PageActiveList值，页面渲染值改变
        PageActiveList(){
            return this.activeList.slice((this.page-1)*5,(this.page-1)*5+5)
        }
    },
    methods:{
        showActiveDetail(index){
            this.isShowList=false
            // 改变活动标题
            this.titleContent=this.activeList[index].title
        },
        handleCurrentChange(newSize){
            this.page=newSize

        }
    }
}
</script>
<style lang="less" scoped>
.active{
    .active-box{
        .image{
            height: 200px;
            overflow: hidden;
            }
        .content{
            .title{
                padding:20px 10px;
                border-bottom:1px solid #ccc;
            }
            .list-content{
                padding:15px 0 0 10px;
                border-bottom:1px dashed #eee;
                .list-title{
                    color:#aeae45;
                }
                .list-title:hover{
                    cursor:pointer;
                }
                .list-same{
                    font-size: 12px;
                    color: #888c90;
                    .space{
                        margin-left:20px;
                    }
                }
            }
            .page{
                margin:20px 0 0 400px;
            }
        }
    }
}
</style>