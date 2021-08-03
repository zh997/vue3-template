<!-- 公共卡片 -->
<template>
  <div class="card-item">
    <div class="card-item-head">
        <span class="head-stage">{{ language === 'zh-CN' ? `第${item.no}期` : `Issue ${item.no}` }}</span>
        <span class="head-text" v-if="showHead">{{index >= 10 ? index : '0' + index}}{{t('m_pit')}}  HQC {{t('estimated_output')}} <span class="head-text-active">{{item.output}}</span> {{t('thousand')}}{{t('pieces')}}</span>
    </div>
    <div class="card-item-row">
        <span class="card-item-row-text"><span>{{t('opening_date')}}：</span>{{item.start_time || item.created_at}}</span>
        <span class="card-item-row-text"><span>{{t('end_date')}}：</span>{{item.end_time}}</span>
    </div>
    <div class="card-item-row">
        <span class="card-item-row-text"><span>{{t('locking')}}HQMC: </span>{{item.price || item.machine_price}}</span>
             <span class="card-item-row-text"><span>{{ language === 'zh-CN' ? '本期' :'' }}HQMC{{t('estimated_consumption')}}: </span>{{item.expected_consume_start}}%-{{item.expected_consume_end}}%</span>
    </div>
    <div class="card-item-row flex-space-between">
         <span class="card-item-row-text"><span>{{ language === 'zh-CN' ? '本期' :''}}HQC{{t('estimated_production')}}: </span>{{item.expected_outpu_start}}%-{{item.expected_outpu_end}}%</span>
        <span class="card-item-row-btn" v-if="showBtn" :class="{'disabeld-btn': item.status_tip === 2}" @click="onClick(item)">{{btnText}}</span>
    </div>
</div>
</template>

<script lang='ts'>
import { } from 'vue';
import { useI18n } from "vue-i18n";
export default {
    name: 'card-item',
    props: {
      index: {
         type: Number,
         default: 0
      },
      btnText: {
          type: String,
          default: '开启'
      },
      showHead: {
          type: Boolean,
          default: true
      },
      showBtn: {
        type: Boolean,
          default: true
      },
      onClick: {
          type: Function,
          default: null
      },
      item: {
          type: Object,
          default: ()=> ({})
      }
    },
    setup() {
        const { t } = useI18n();
        const language = localStorage.getItem('language') || 'zh-CN';
       return { t, language }
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>