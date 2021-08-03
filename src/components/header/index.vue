<!-- 公共头部区域 -->
<template>
    <div class="top-bar" v-if="isShowHeader">
        <div class="both-sides"></div>
        <img :src="require('@/assets/LOGO@2x.png')" class="logo-img" alt="">
        <div class="both-sides local-btn">
            <span :class="language === 'zh-CN' && 'local-btn-active'" @click="change('zh-CN')">中文</span> / 
            <span :class="language === 'en-US' && 'local-btn-active'" @click="change('en-US')">Eglish</span></div>
    </div>
    
    <swipe v-if="isShowSwiper" class="home-swipe" indicator-color="white">
        <swipe-item v-for="item,index in banners" :key="index">
          <img :src="item.banner" alt="">
        </swipe-item>
    </swipe>
</template>

<script lang='ts'>
import { Swipe, SwipeItem } from 'vant';
export default {
    name: 'Header',
    props: {
        banners: {
          type: Array,
          default: () => [
            {
                banner: require('@/assets/banner_img_1@2x.png')
            },
            {
                banner: require('@/assets/banner_img_1@2x.png')
            },
            {
                banner: require('@/assets/banner_img_1@2x.png')
            },
            {
                banner: require('@/assets/banner_img_1@2x.png')
            }
          ]
        },
        change: {
           type: Function,
           default: () => {},
        },
        isShowSwiper: {
           type: Boolean,
           default: true,
        },
        isShowHeader: {
           type: Boolean,
           default: true,
        }
    },
    components: {
        Swipe,
        SwipeItem,
    },
    setup() {
        const language = localStorage.getItem('language') || 'zh-CN';
        return {language}

    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>