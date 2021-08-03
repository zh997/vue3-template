<!-- 确认转让 -->
<template>
  <CustomNavBar :title="t('confirmation_of_transfer')"/>
  <div class='page-wrap'>
      <div class="transform_confirm-page">
          <div class="withdraw-code-panel">
              <!-- <div class="withdraw-select" v-if="query?.receive_address">
                  <span class="withdraw-select-label">{{t('my_address')}}：</span>
                  <div class="withdraw-select-value border-clean">
                      <span>{{query?.receive_address}}</span>
                  </div>
              </div>
              <div class="blance-text"></div> -->
              <div class="withdraw-select">
                  <span class="withdraw-select-label">{{t('transfer_address')}}：</span>
                  <input type="text" v-model="address" class="withdraw-select-value" :placeholder="t('transfer_address_placeholder')">
              </div>
              <div class="blance-text"></div>
              <div class="withdraw-select">
                  <span class="withdraw-select-label">{{t('transfer')}} {{query?.type}} {{t('quantity')}}：</span>
                  <input type="number" v-model="num" class="withdraw-select-value" :placeholder="t('transfer_quantity_placeholder')">
              </div>
              <div class="blance-text-wrap" v-if="query?.type === 'HQC'">
                   <div class="blance-text">{{t('available')}}：{{indexAsset?.hqc_money}}</div>
              </div>
              <div class="blance-text-wrap" v-if="query?.type === 'HQMC'">
                   <div class="blance-text">{{t('available')}}：{{indexAsset?.canuse_money}}</div>
              </div>
               <div class="withdraw-select" v-if="query?.type === 'HQC'">
                  <span class="withdraw-select-label">{{t('transfer_consumption')}}：</span>
                  <div class="withdraw-select-value border-clean">
                      <span>{{money_config?.hqc_config.hqc_transfer_fee}}% HQC</span>
                  </div>
                   <!-- <div class="blance-text">{{t('available')}}：{{indexAsset?.hqc_money}}</div> -->
              </div>
              <div class="withdraw-select" v-if="query?.type === 'HQMC'">
                  <span class="withdraw-select-label">{{t('consume')}} HQC {{t('quantity')}}：</span>
                  <div class="withdraw-select-value border-clean">
                      <span>{{dec_hqc}}</span>
                  </div>
                 <!-- <div class="blance-text">{{t('available')}}：{{indexAsset?.hqc_money}}</div> -->
              </div>
              <!-- <div class="withdraw-select">
                  <span class="withdraw-select-label">消耗HQC数量：</span>
                  <div class="withdraw-select-value border-clean">
                      <span>888.88</span>
                  </div>
              </div> -->
              <div class="withdraw-btn" @click="onSubmit">{{t('confirmation_of_transfer')}}</div>
          </div>
      </div>
  </div>
</template>

<script lang='ts'>
import { onMounted, ref, computed } from 'vue';
import ClipboardJS from 'clipboard';
import { Toast, Dialog } from 'vant';
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
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
        const address = ref<string>('');
        const num = ref<string>('');
        const indexAsset = ref<IHomeAssetResDTO>();

        onMounted(async () => {
            let ClipboardJSObj=new ClipboardJS('.team-link-copy,.team-link-copy-img')
            ClipboardJSObj.on('success', function(e) {
                Toast.success(t('copy_succeeded')); 
                e.clearSelection();
            });
            ClipboardJSObj.on('error', function(e) {
                e.clearSelection();
            })

             utils.loading(t('loading'));
            const [indexAssetRes] = await Promise.all([services.homeWalletAsset()]) ;
            indexAsset.value = indexAssetRes.data;
            utils.loadingClean();
        })

        const onSubmit = async () => {
            if (!address.value) {
                return utils.toast(t('transfer_address_placeholder'));
            }
            if (!num.value) {
                return utils.toast(t('transfer_quantity_placeholder'));
            }

            Dialog.confirm({
                title: t('tips'),
                message: t('config_transfrom'),
            })
            .then(async () => {
                // on confirm
               if (query.type === 'HQC') {
                    utils.loading(t('loading'));
                    await services.hqcTransfer({
                        address: address.value,
                        money_type: 'hqc_money',
                        num:  Number(num.value) 
                    });
                    Toast.success(t('successful_transfer'));
                }
                if (query.type === 'HQMC') {
                    utils.loading(t('loading'));
                    await services.hqmcTransfer({
                        address: address.value,
                        money_type: 'hqmc_money',
                        num:  Number(num.value) 
                    });
                    Toast.success(t('successful_transfer'));
                }
            })
            .catch(() => {
                // on cancel
            });
            
        }

        const dec_hqc = computed({
            get: () => {
                const change_dec_hqc = money_config.value?.change_config.change_dec_hqc;
                const hqc_hqmc_price =  money_config.value?.price_config.hqc_hqmc_price;
                const z = new Decimal(Number(change_dec_hqc));
                const rate = z.dividedBy(100).mul(Number(num.value)).dividedBy(Number(hqc_hqmc_price));
                return Number(rate);
            },
            set: () => {

            }
        })

        return { query, num, address,dec_hqc, money_config, indexAsset, t , onSubmit}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>