<!-- 邀请好友 -->
<template>
  <CustomNavBar :border="false"/>
  <div class="page-wrap share-page">
      <img :src="require('@/assets/share_img_1@2x.png')" class="share-title" alt="">
      <div id="qrcode" class="share-code"></div>
      <!-- <img :src="require('@/assets/share_code@2x.png')" class="share-code" alt=""> -->
      <span class="share-link-tip">{{t('invitation_link')}}</span>
      <span class="share-link" id="copy">{{shareInfo?.share_url}}</span>
      <span class="share-copy-btn" data-clipboard-target="#copy">{{t('copy_link')}}</span>
      <img :src="require('@/assets/share_img_2@2x.png')" class="share-img" alt="">
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { Toast  } from 'vant';
import ClipboardJS from 'clipboard';
import { qrcanvas } from 'qrcanvas';
import { useI18n } from "vue-i18n";
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import * as services from '@/services/index';
import { IShareInfoResDTO } from '@/services/interface/response.d';
import * as utils from '@/utils';

export default {
    name: '',
    components:{
        CustomNavBar,
    },
    setup() {
        const { t } = useI18n();
        const shareInfo = ref<IShareInfoResDTO>();
        const onInitData = async () => {
            try{
                utils.loading(t('loading'));
                const response = await services.shareInfo();
                shareInfo.value = response.data;
                utils.loadingClean();
                onRenderQrcode(response.data.share_url)
            } catch(err){
                utils.toast(err || err.msg);
            }
        }

        const onRenderQrcode = (url: any) => {
            var canvas = qrcanvas({
                data: url
            })

            const qrcodeNode = document.getElementById('qrcode');
            if (qrcodeNode) {
                qrcodeNode.innerHTML = '';
                qrcodeNode.appendChild(canvas);
            }
        }

        onMounted(async () => {
            await onInitData();
            let ClipboardJSObj=new ClipboardJS('.share-copy-btn')
            ClipboardJSObj.on('success', function(e) {
                Toast.success(t('copy_succeeded'))
                e.clearSelection();
            });
            ClipboardJSObj.on('error', function(e) {
                e.clearSelection();
            })

        })
        return {
            shareInfo,
            t
        }
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>