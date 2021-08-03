<!-- 平台介绍 -->
<template>
  <CustomNavBar :title="t('platform_introduction')"/>
  <div class="page-wrap">
      <div class="plateform-intro-page">
        <!-- <img :src="require('@/assets/intro_banner@2x.png')" alt=""> -->
        <div class="plateform-intro" v-html="platform && platform[0].content"></div>
        <div class="plateform-intro-group">
            <div class="plateform-intro-item" @click="onRouter(`/plateform_intro_detail_page?name=${t('service_agreement')}&index=1`)">
                <span class="plateform-intro-item-label">{{t('service_agreement')}}</span>
                <img :src="require('@/assets/icon_right_arrow_light@2x.png')" alt="">
            </div>
            <div class="plateform-intro-item" @click="onRouter(`/plateform_intro_detail_page?name=${t('privacy_clause')}&index=2`)">
                <span class="plateform-intro-item-label">{{t('privacy_clause')}}</span>
                <img :src="require('@/assets/icon_right_arrow_light@2x.png')" alt="">
            </div>
            <div class="plateform-intro-item" @click="onRouter(`/plateform_intro_detail_page?name=${t('version_diary')}&index=3`)">
                <span class="plateform-intro-item-label">{{t('version_diary')}}</span>
                <img :src="require('@/assets/icon_right_arrow_light@2x.png')" alt="">
            </div>
            <div class="plateform-intro-item" @click="onRouter(`/plateform_intro_detail_page?name=${t('current_version')}&index=4`)">
                <span class="plateform-intro-item-label">{{t('current_version')}}</span>
                <img :src="require('@/assets/icon_right_arrow_light@2x.png')" alt="">
            </div>
        </div>
      </div>
  </div>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
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
        const { t } = useI18n();
        const router = useRouter();
        const platform = ref<IPlatFormResDTO[]>();
        const onGetPlatintro = async () => {
            utils.loading(t('loading'));
            const res = await services.plat_form();
            platform.value = res.data;
            utils.loadingClean()
        }
        onMounted(() =>{
            onGetPlatintro();
        })
       return {platform, t, onRouter: (path: string) => {
          router.push(path)
       }}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>