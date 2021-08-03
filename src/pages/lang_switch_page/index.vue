<!-- 资产详情 -->
<template>
  <CustomNavBar :title="t('language_settings')" />
  <div class="page-wrap">
      <RadioGroup v-model="language">
        <div class="language-settings-page">
           <div class="language-setting-item" @click="change('zh-CN')">中文 <Radio name="zh-CN"/></div>
           <div class="language-setting-item" @click="change('en-US')" >English <Radio name="en-US"/></div>
      </div>
      </RadioGroup>
      
  </div>
</template>

<script lang='ts'>
import { useI18n } from "vue-i18n";
import { Radio, RadioGroup } from 'vant';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
export default {
    name: '',
    components: {
       CustomNavBar,
       Radio,
       RadioGroup
    },
    setup() {
        const { t } = useI18n();
        const language = localStorage.getItem('language') || 'zh-CN';
        /** 中英文切换 */
        const change = (type: any) => {
            localStorage.setItem('language', type);
            window.location.reload();
        }
        return { t, language, isZhCn: language === 'zh-CN', isEnUs: language === 'en-US', change}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>