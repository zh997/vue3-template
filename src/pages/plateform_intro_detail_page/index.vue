<!-- 平台介绍 -->
<template>
  <CustomNavBar :title="query.name"/>
  <div class="page-wrap">
      <div class="plateform-intro-page">
        <!-- <img :src="require('@/assets/intro_banner@2x.png')" alt=""> -->
        <div class="plateform-intro" v-html="platform && platform[index].content"></div>
      </div>
  </div>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import * as services from '@/services/index';
import * as utils from '@/utils';
import { IPlatFormResDTO } from '@/services/interface/response.d';

export default {
    name: '',
    components: {
        CustomNavBar
    },
    setup() {
        const { query } = useRoute();
        const platform = ref<IPlatFormResDTO[]>();
        const onGetPlatintro = async () => {
            utils.loading('加载中');
            const res = await services.plat_form();
            platform.value = res.data;
            utils.loadingClean()
        }
        onMounted(() =>{
            onGetPlatintro();
        })
       return {platform, query, index: Number(query.index)}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>