<!-- 公共标题 -->
<template>
  <div class="block-title">
    <div class="block-title-label">
        <img :src="icon" alt="">
        <span>{{title}}</span>
    </div>
    <span class="block-title-value" @click="onClickRight" v-if="value">{{value}}</span>
    <Icon name="balance-list-o" color="#1678FF" size="24px" @click="onClickRight" v-if="showIcon"/>
  </div>
</template>

<script lang='ts'>
import { } from 'vue';
import { Icon } from 'vant';
export default {
    name: 'block_title',
    props: {
        icon: {
            type: String,
            default: require('@/assets/home_icon_9@2x.png')
        },
        title: {
            type: String,
            default: '资产'
        },
        value: {
            type: String,
            default: ''
        },
        onClickRight: {
            type: Function,
            default: null
        },
        showIcon: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Icon
    },
    setup() {}
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>