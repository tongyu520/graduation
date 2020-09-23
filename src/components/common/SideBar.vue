<template>
    <div class="side-bar">
        <div class="bar-title pl">{{title}}</div>
        <ul>
            <li  class='bar-items pl' 
            v-for='(item,index) in content' :key='item'
             @click='itemClick(index)'
             :class='{active:index===currentindex}'>{{item}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            currentindex:0
        }
    },
    props:{
        title:{
            type:String
        },
        content:{
            type:Array
        }
    },
    methods:{
        itemClick(index){
            this.currentindex=index
            // 给父组件发送事件，将索引传出去
            this.$emit('changeContent',index)
        }
    }
}
</script>
<style lang="less" scoped>
.side-bar{
    width:200px;
    // 和父元素一样高，设置背景
    position:relative;
    top:0;
    bottom:0;
    margin-right:20px;
    box-sizing: border-box;
    background-color: #f3f3f3;
    .bar-title{
        height:57px;
        line-height:57px;
        border-bottom:1px solid #ccc;
        color:#077cf5;
    }
    .bar-items{
        height:40px;
        line-height:40px;
        font-size: 12px;
        border-bottom: 1px dashed #ccc;
        color: #5d5d5d;
    }
    .active{
        background-color:#409EFF;
    }
    li:hover{
        cursor: pointer;
    }
}
</style>