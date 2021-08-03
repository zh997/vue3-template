<!-- 充提 -->
<template>
  <CustomNavBar :title="query.name" />
  <div class="page-wrap">
      <div class="full-extraction-page">
          <div class="assets-head">
              <span class="assets-head-label">{{query.name}} {{t('current_balance')}}</span>
              <span class="assets-head-value">{{walletUsdt?.money || walletHqc?.hqc_money}}</span>
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
         
          <!-- <div class="charge-code-panel" v-if="query.name !== 'USDT'">
              <div id="qrcode" class="share-code"></div>
              <img :src="require('@/assets/share_code_black@2x.png')" class="share-code" alt="">
              <div class="team-link-group">
                <span>充币地址：<span id="copy">{{walletUsdt?.usdt_wallet || walletHqc?.hqc_wallet}}</span></span>
                <img :src="require('@/assets/icon_copy@2x.png')" alt="" class="team-link-copy-img" data-clipboard-target="#copy">
            </div>
          </div> -->
      </div>
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import { qrcanvas } from 'qrcanvas';
import { useI18n } from "vue-i18n";
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import * as routerPaths from '@/constants/app_routes_path';
import * as services from '@/services/index';
import * as utils from '@/utils';
import { IHomeWalletUsdtResDTO, IHomeWalletHqcResDTO } from '@/services/interface/response';

export default {
    name: '',
    components: {
       CustomNavBar,

    },
    setup() {
        const { t } = useI18n();
        const { query } = useRoute();
        const router = useRouter();
        const qrcodeDom = ref<HTMLElement>();
        const walletUsdt = ref<IHomeWalletUsdtResDTO>();
        // const record_list = ref<IRecordItemResDTO[]>();
        const walletHqc = ref<IHomeWalletHqcResDTO>();
        let btnItems = ref();
        
        onMounted(async () => {
            utils.loading('加载中');
            if (query.name === 'USDT') {
                const [resWalletUsdt] = await Promise.all([services.homeWalletUsdt()]);
                walletUsdt.value = resWalletUsdt.data;
                // record_list.value = list.data;
                utils.loadingClean();
                btnItems.value = [
                    {
                        text: t('recharge'),
                        path: routerPaths.charge_page
                    },
                    {
                        text:  t('extract'),
                        path: routerPaths.withdraw_page
                    },
                ]
                // onRenderQrcode(walletUsdt.value.usdt_wallet);
            }
            if (query.name === 'HQC') {
                const [resWalletHqc] = await Promise.all([services.homeWalletHqc()]);
                walletHqc.value = resWalletHqc.data;
                // record_list.value = list.data;
                utils.loadingClean();
                btnItems.value = [
                    {
                        text: t('make_over'),
                        path: routerPaths.transform_confirm_page
                    }
                ]
                // onRenderQrcode(walletHqc.value.hqc_wallet);
            }
            
        })

        // const onRenderQrcode = (url: string) => {
        //     var canvas = qrcanvas({
        //         data: url,
        //         size: 4234,
        //     })

        //     const qrcodeNode = document.getElementById('qrcode');
        //     if (qrcodeNode) {
        //         qrcodeNode.innerHTML = '';
        //         qrcodeNode.appendChild(canvas);
        //     }
        // }

        return {query, btnItems,walletUsdt, walletHqc, qrcodeDom, t, onRouter: (path: string) => {
                if (query.name === 'USDT'){
                    path = path + `?receive_address=${walletUsdt.value?.usdt_wallet}&type=USDT`
                } else {
                     path = path + `?receive_address=${walletHqc.value?.hqc_wallet}&type=HQC`
                }
                router.push(path);
            }}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>