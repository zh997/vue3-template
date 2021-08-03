<!-- nav bar -->
<template>
   <NavBar :title="title" class="custom-nav-bar" fixed :border="border">
        <template #left>
            <img 
                :src="require('@/assets/icon_back@2x.png')" 
                @click="onClickleft" 
                class="navbar-left-icon" 
                alt=""
            >
        </template>
    </NavBar>
</template>

<script lang='ts'>
import {  } from 'vue';
import { useRouter } from 'vue-router';
import { NavBar } from 'vant';
export default {
    name: 'custom_nav_bar',
    props: {
      title: {
          type: String,
          default: ''
      },
      onBack:{
          type: Function,
          default: null
      },
      delta: {
          type: Number,
          default: 1
      },
      border: {
          type: Boolean,
          default: true
      }
    },
    components: {
        NavBar
    },
    setup(props: any) {
        const router = useRouter();
        return {
            onClickleft: () => {
                if(props.onBack) {
                    return props.onBack();
                }
                return router.go(-props.delta);
            }
        }
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>