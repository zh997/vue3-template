<!-- 资产详情 -->
<template>
  <CustomNavBar title="HQMC" />
  <div class="page-wrap">
      <div class="hqmc_info_page">
          <div class="assets-head">
              <span class="assets-head-label">HQMC {{t('current_balance')}}</span>
              <span class="assets-head-value">{{hqmcMoney?.hqmc_money}}</span>
          </div>
          <div class="assets-btn-group">
              <div class="assets-btn-item" v-for="item,index in btnItems" :key="index" @click="onRouter(item.path)">{{item.text}}</div>
          </div>
          <!-- <div v-else>
              <div v-if="record_list && record_list.length > 0">
                    <RecordItem v-for="item in record_list" :key="item.user_id" :item="item"/>
            </div>
            <Empty v-else/>
          </div> -->
          
          <!-- <div class="warning-text">
              <p class="warning-text-title">充值注意事项：</p>
              <p>此地址只接受TRC20模式的USDT转入充值，请勿充值任何非USDT资产，否则资产不可找回，区块链得到确认后，平台即自动入账，请务必保证您的波场钱包有充足的USDT资产，以及确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
              <p class="warning-text-title">提币注意事项：</p>
              <p>为保障您的资金安全，请勿填写支持TRC20通道的提币合约地址，以及务必确认电脑及浏览器安全，防止信息被篡改和泄露。</p>
          </div> -->
      </div>
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import { Empty } from 'vant';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import RecordItem from '@/components/record_item/index.vue';
import * as routerPaths from '@/constants/app_routes_path';
import * as services from '@/services/index';
import * as utils from '@/utils';
import { IHomeHqmcMoneyResDTO, IRecordItemResDTO } from '@/services/interface/response';
export default {
    name: '',
    components: {
       CustomNavBar,
       RecordItem,
       Empty
    },
    setup() {
        const { t } = useI18n();
        const { query } = useRoute();
        const router = useRouter();
        // const record_list = ref<IRecordItemResDTO[]>();
        const hqmcMoney = ref<IHomeHqmcMoneyResDTO>();
        const btnItems = [
            {
                text: t('exchange'),
                path: routerPaths.exchange_page + '?'
            },
            {
                text: t('make_over'),
                path: routerPaths.transform_confirm_page + "?type=HQMC"
            },
            {
                text: t('destroy'),
                path: routerPaths.destroy_page + '?'
            }
        ]
        onMounted(async () => {
            utils.loading(t('loading'));
            const [resHqcMoney] = await Promise.all([services.hqcMoney()]);
            hqmcMoney.value = resHqcMoney.data;
            // record_list.value = list.data;
            utils.loadingClean();
        })
        return {query, btnItems, hqmcMoney, t, onRouter: (path: string) => {
                router.push(path);
            }}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>