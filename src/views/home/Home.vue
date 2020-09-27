<template>
    <div class="home">
        <swiper>
            <swiper-item v-for="item in banners" :key='item.image'>
            <img :src="item.image" alt="">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    data(){
        return{
            banners:[
                {image: require(`@/assets/img/three.jpg`) },
                {image: require(`@/assets/img/two.jpg`) },
                {image: require(`@/assets/img/five.jpg`) },
                {image: require(`@/assets/img/six.jpg`) }
            ]
        }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style lang='less' scoped>

</style>
