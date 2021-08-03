<!-- 销毁 -->
<template>
  <CustomNavBar :title="t('destroy')"/>
  <div class='page-wrap'>
      <div class="exchange-page">
         <div class="exchange-form-panel">
              <div class="withdraw-select">
                  <span class="withdraw-select-label">{{t('destroy')}} HQMC {{t('quantity')}}</span>
                  <input type="number" v-model="num" class="withdraw-select-value" :placeholder="t('destroy_quantity_placeholder')">
              </div>
                <div class="blance-text-wrap">
                <div class="blance-text">{{t('available')}}：{{indexAsset?.canuse_money}}</div>
              </div>
             
               <div class="withdraw-select">
                  <span class="withdraw-select-label">{{t('get')}} USDT {{t('quantity')}}：</span>
                  <span class="withdraw-select-text">{{dec_usdt || '0'}}</span>
                   <!-- <div class="blance-text">可用：{{indexAsset?.hqmc_money}}</div> -->
                  <!-- <input type="number" class="withdraw-select-value" placeholder="888.88"> -->
              </div>
              <div class="blance-text"></div>
               <div class="withdraw-select">
                  <span class="withdraw-select-label">{{t('consume')}} HQC {{t('quantity')}}：</span>
                  <span class="withdraw-select-text">{{dec_hqc || '0'}}</span>
                  <!-- <div class="blance-text">{{t('available')}}：{{indexAsset?.hqc_money}}</div> -->
                  <!-- <input type="number" class="withdraw-select-value" placeholder="888.88"> -->
              </div>
               <!-- <div class="blance-text">HQMC余额：888</div> -->
              <div class="withdraw-btn" @click="onSubmit">{{t('destroy')}}</div>
         </div>
      </div>
  </div>
</template>

<script lang='ts'>
import { ref, onMounted, computed } from 'vue';
import { Toast, Dialog  } from 'vant';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
import Decimal from 'decimal.js';
import { useGlobalHooks } from '@/hooks';
import * as utils from '@/utils';
import * as services from '@/services/index';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import { IHomeAssetResDTO } from '@/services/interface/response';

export default {
    name: '',
    components: {
       CustomNavBar,
    },
    setup() {
        const { t } = useI18n();
        const { money_config } = useGlobalHooks();
        const { query } = useRoute();
        const num = ref<string>('');
        const indexAsset = ref<IHomeAssetResDTO>();

        onMounted(async () => {
            utils.loading(t('loading'));
            const [indexAssetRes] = await Promise.all([services.homeWalletAsset()]) ;
            indexAsset.value = indexAssetRes.data;
            utils.loadingClean();
        })

        const dec_usdt = computed({
            get: () => {
                const change_dec_usdt = money_config.value?.destory_config.destory_dec_usdt;
                const hqmc_usdt_price =  money_config.value?.price_config.hqmc_usdt_price;
                const z = new Decimal(Number(change_dec_usdt));
                const rate = z.dividedBy(100).mul(Number(num.value)).mul(Number(hqmc_usdt_price));
                return Number(rate);
            },
            set: () => {

            }
        })

        const dec_hqc = computed({
            get: () => {
                const change_dec_hqc = money_config.value?.destory_config.destory_dec_hqc;
                 const hqc_hqmc_price =  money_config.value?.price_config.hqc_hqmc_price;
                const z = new Decimal(Number(change_dec_hqc));
                const rate = z.dividedBy(100).mul(Number(num.value)).dividedBy(Number(hqc_hqmc_price));
                return Number(rate);
            },
            set: () => {

            }
        })

        const onSubmit = async () => {
            if (!num.value) {
                return utils.toast(t('destroy_quantity_placeholder'));
            }
            Dialog.confirm({
                title: t('tips'),
                message: t('confirm_destroy'),
                confirmButtonText: t('confirm'),
                    cancelButtonText: t('cancel')
            })
            .then(async () => {
                // on confirm
                 utils.loading(t('loading'));
                await services.hqmcDestory({
                    num: parseInt(num.value, 10) 
                });
                Toast.success(t('destroyed_successfully'));
            })
            .catch(() => {
                // on cancel
            });
           
        }

        return { query, num, dec_usdt, dec_hqc,indexAsset, t , onSubmit}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>