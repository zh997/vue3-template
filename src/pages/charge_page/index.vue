<!-- 充币 -->
<template>
  <CustomNavBar :title="t('recharge')"/>
  <div class='page-wrap'>
      <div class="charge-page">
          <div class="charge-code-panel">
              <!-- <div class="charge-select" @click="onShowPopup">
                  <span class="charge-select-label">币种选择：</span>
                  <div class="charge-select-value">
                      <span>USDT</span>
                      <img :src="require('@/assets/icon_down_arrow@2x.png')" alt="">
                  </div>
              </div> -->
              <div class="charge-select">
                  <span class="charge-select-label">{{t('recharge_quantity')}}：</span>
                  <input type="number" v-model="num" :placeholder="t('recharge_quantity_placeholder')" class="charge-select-value">
              </div>
              <!-- <div id="qrcode" class="share-code"></div>
              <img :src="require('@/assets/share_code_black@2x.png')" class="share-code" alt="">
              <div class="team-link-group">
                <span>充币地址：<span id="copy">{{query?.receive_address}}</span></span>
                <img :src="require('@/assets/icon_copy@2x.png')" alt="" class="team-link-copy-img" data-clipboard-target="#copy">
            </div> -->
            <div class="charge-btn" @click="onRecharge">{{t('recharge')}}</div>
          </div>
          <!-- <div class="warning-text">
              <p class="warning-text-title">注意事项：</p>
              <p>此地址只接受TRC20模式的USDT转入充值，请勿充值任何非USDT资产，否则资产不可找回，区块链得到确认后，平台即自动入账，请务必保证您的波场钱包有充足的USDT资产，以及确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
          </div> -->
      </div>
      <Popup  v-model:show="show" round position="bottom">
         <Picker title="标题"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
            confirm-button-text="确认" cancel-button-text="取消"
            />
      </Popup>
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import ClipboardJS from 'clipboard';
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
// import { qrcanvas } from 'qrcanvas';
import { Toast, Popup, Picker, Dialog  } from 'vant';
import { transaction } from '@/tronlink/index';
import * as utils from '@/utils';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
export default {
    name: '',
    components: {
       CustomNavBar,
       Popup,
       Picker 
    },
    setup() {
        const { t } = useI18n();
        const { query } = useRoute();
        const num = ref<string>('');
        const columns = ['USDT'];
        const show = ref(false);
        
        onMounted(() => {
            let ClipboardJSObj=new ClipboardJS('.team-link-copy,.team-link-copy-img')
            ClipboardJSObj.on('success', function(e) {
                Toast.success(t('copy_succeeded')); 
                e.clearSelection();
            });
            ClipboardJSObj.on('error', function(e) {
                e.clearSelection();
            })

            // onRenderQrcode(query.receive_address);
        })
        const onShowPopup = () => show.value = true; 
        const onConfirm = () => show.value = false;
        const onCancel = () => show.value = false;

        // const onRenderQrcode = (url: any) => {
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

        const onRecharge = async () => {
            if (num.value) {
               
                try {
                    Dialog.confirm({
                        title: t('tips'),
                        message: t('confirm_recharge'),
                        confirmButtonText: t('confirm'),
                        cancelButtonText: t('cancel')
                    })
                    .then(async () => {
                        // on confirm
                        try {
                            utils.loading(t('recharging'));
                            const amount = (Number(num.value) * Math.pow(10, 6)).toString();
                            const res = await transaction(amount, query.receive_address);
                            console.log(res);
                            utils.loadingClean();
                            Dialog.alert({
                                title: t('tips'),
                                message: t('recharged_tips'),
                                confirmButtonText: t('confirm'),
                            }).then(() => {
                                console.log('on close');
                            })
                        } catch(err) {
                            console.log(err);
                            utils.toast(err || err.message);
                        }
                        
                    })
                    .catch(() => {
                        // on cancel
                    });
                    
                } catch(err) {
                    utils.toast(err.msg || err);
                }
            } else {
                 utils.toast(t('recharge_quantity_placeholder'));
            }
        }

        return {columns, show, query, num, t , onShowPopup, onConfirm, onCancel, onRecharge}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>