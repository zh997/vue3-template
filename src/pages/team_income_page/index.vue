<!-- 团队收益 -->
<template>
   <CustomNavBar :title="t('team_benefits')"/>
   <div class="page-wrap">
     <div class="team-income-page">
        <div class="team-income-title">
          <span></span>
          我的收益
          <!-- <span @click="onCheckMore">查看更多</span> -->
          <span></span>
        </div>
        <!-- <BlockTitle :icon="require('@/assets/icon_income@2x.png')" :title="`${t('total_revenue')}：${teamBenefits?.profit_info?.total_profit || '0.00'}`" :value="t('check_more')" :onClickRight="onCheckMore"/> -->
        <div class="income-group-wrap">
          <!-- <div class="asstes-group">
            <div class="asstes-group-item">
              <span>{{t('usdt_wallet')}}</span>
              <span class="asstes-value">￥{{teamBenefits?.store_info?.money || '0.00'}}</span>
            </div>
            <div class="asstes-group-item">
              <span>{{t('hqc_wallet')}}</span>
              <span class="asstes-value">￥{{teamBenefits?.store_info?.hqc_money || '0.00'}}</span>
            </div>
            
            <div class="asstes-group-item">
              <span>{{t('hqmc_wallet')}}</span>
              <span class="asstes-value">￥{{teamBenefits?.store_info?.hqmc_money || '0.00'}}</span>
            </div>
          </div> -->
          <div class="team-income-type">
            <div class="team-income-type-item" @click="onRouter(t('pool_income_record'), 'static_award')">
              <img :src="require('@/assets/team_income_icon_1@2x.png')" alt="">
              <span class="team-income-type-item-label">{{t('pool_income')}}</span>
              <span class="team-income-type-item-value">{{teamBenefits?.profit_info?.mining_profit || '0.00'}}</span>
            </div>
            <div class="line"></div>
            <div class="team-income-type-item" @click="onRouter(t('share_income_record'), 'share_award')">
              <img :src="require('@/assets/team_income_icon_2@2x.png')" alt="">
              <span class="team-income-type-item-label">{{t('share_income')}}</span>
              <span class="team-income-type-item-value">{{teamBenefits?.profit_info?.share_profit || '0.00'}}</span>
            </div>
            <div class="line"></div>
            <div class="team-income-type-item" @click="onRouter(t('team_benefits_record'), 'team_award')">
              <img :src="require('@/assets/team_income_icon_3@2x.png')" alt="">
              <span class="team-income-type-item-label">{{t('team_benefits')}}</span>
              <span class="team-income-type-item-value">{{teamBenefits?.profit_info?.team_profit || '0.00'}}</span>
            </div>
          </div>
        </div>
         <div class="quotes-info" v-html="quotes?.content"></div>
     </div>
   </div>
   
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import BlockTitle from '@/components/block_title/index.vue';
import * as routesPaths from '@/constants/app_routes_path';
import * as services from '@/services/index';
import { ITeamBenefitsResDTO } from '@/services/interface/response.d';
import * as utils from '@/utils';

export default {
    name: 'team_income_page',
    components: {
      CustomNavBar,
      BlockTitle
    },
    setup() {
      const { t } = useI18n();
      const router = useRouter();
        const teamBenefits = ref<ITeamBenefitsResDTO>();
        const quotes = ref<{content:string}>();
        onMounted(async () => {
           try {
               utils.loading(t('loading'));
               const [teamBenefitsRes, quotesRes] = await Promise.all([services.teamBenefits(), services.quotes()]);
               teamBenefits.value = teamBenefitsRes.data;
               quotes.value = quotesRes.data;
               console.log(quotesRes);
               utils.loadingClean()
           } catch(err) {
               utils.toast(err || err.msg);
           }
        })
       return {
         teamBenefits,
         t,
         quotes,
         onCheckMore: () => {
           router.push(routesPaths.team_income_record_page + `?name=${t('team_benefits_record')}`);
         },
         onRouter(name: string, type: number){
           router.push(routesPaths.team_income_record_page + `?name=${name}&type=${type}`);
         }
       }
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>