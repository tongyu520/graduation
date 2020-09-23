<template>
    <div class="edu">
        <nav-bar></nav-bar>
        <router-view></router-view>
        <bottom></bottom>
    </div>
</template>
<script>
import NavBar from 'components/common/NavBar'
import Bottom from 'components/common/Bottom'
export default {
  components:{
    NavBar,
    Bottom
  }
}
</script>
<style lang="less" scoped>
    .edu{
        width: 1000px;
        margin:0 auto;
    }
</style>