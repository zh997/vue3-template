<!-- 首页 -->
<template>
  <div class="tabbar-page">
    <Header :banners="banners" :change="change"/>
    <div class="grid-group">
      <div class="grid-group-item" v-for="item,index in gridItems" :key="index" @click="onRouter(item.path)">
        <img :src="item.icon" alt="">
        <span>{{item.text}}</span>
      </div>
    </div>
    <BlockTitle :title="t('assets')" :showIcon="true" :onClickRight="onToBill"/>
    <div class="asstes-group">
      <div class="asstes-group-item">
        <span>{{t('usdt_wallet')}}</span>
        <span class="asstes-value">￥{{indexAsset?.money || '0.00'}}</span>
      </div>
      <div class="asstes-group-item">
        <span>{{t('hqc_wallet')}}</span>
        <span class="asstes-value">￥{{indexAsset?.hqc_money || '0.00'}}</span>
      </div>
      <div class="asstes-group-item">
        <span>{{t('hqmc_wallet')}}</span>
        <span class="asstes-value">￥{{indexAsset?.hqmc_money || '0.00'}}</span>
      </div>
    </div>
    <!-- <div class="asstes-group">
      <div class="asstes-group-item">
        <span>USDT钱包</span>
        <span class="asstes-value">￥{{indexAsset?.money}}</span>
      </div>
      <div class="asstes-group-item">
        <span>HQC钱包</span>
        <span class="asstes-value">￥{{indexAsset?.hqc_money}}</span>
      </div>
      <div class="asstes-group-item">
        <span>HQMC钱包</span>
        <span class="asstes-value">￥{{indexAsset?.hqmc_money}}</span>
      </div>
    </div> -->
  </div>
</template>

<script lang='ts'>
import { reactive, onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
// import { Image as VantImage} from 'vant';
import { useRouter } from 'vue-router';
import Header from '@/components/header/index.vue';
import BlockTitle from '@/components/block_title/index.vue';
import * as routesPaths from '@/constants/app_routes_path';
import * as services from '@/services/index';
import { IHomeBannerResDTO, IHomeAssetResDTO } from '@/services/interface/response.d';
import * as utils from '@/utils';

export default {
    name: 'home_page',
    components: {
      Header,
      BlockTitle,
      // VantImage
      
    },
    setup() {
      const { t }: any = useI18n();
      // const { proxy }: any = getCurrentInstance();
      const router = useRouter();
      const banners = ref<IHomeBannerResDTO[]>([]);
      const indexAsset = ref<IHomeAssetResDTO>();

      /** 中英文切换 */
      const change = (type: any) => {
        localStorage.setItem('language', type);
        window.location.reload();
      }

      const onInitData = async () => {
        try {
          utils.loading(t('loading'));
          const [bannerRes, indexAssetRes] = await Promise.all([services.homeBanner({lang: 'zh_CN'}), services.homeWalletAsset()]) ;
          banners.value = bannerRes.data;
          indexAsset.value = indexAssetRes.data;
          utils.loadingClean();
        } catch(err) {
          utils.toast(err || err.msg);
        }
      }
      
      onMounted(()=> {
        onInitData()
      })

      const gridItems = reactive([
        {
          icon: require('@/assets/home_icon_1@2x.png'),
          text: 'USDT',
          path: routesPaths.full_extraction_page + `?name=USDT`
        },
        {
          icon: require('@/assets/home_icon_2@2x.png'),
          text: 'HQC',
          path: routesPaths.full_extraction_page + `?name=HQC`
        },
        {
          icon: require('@/assets/LOGO@2x.png'),
          text: 'HQMC',
          path: routesPaths.hqmc_info_page
        },
        {
          icon: require('@/assets/home_icon_4@2x.png'),
          text: t('share'),
          path: routesPaths.share_page
        },
        {
          icon: require('@/assets/home_icon_5@2x.png'),
          text: t('ore_pool'),
          path: routesPaths.orepool_page
        },
        {
          icon: require('@/assets/home_icon_6@2x.png'),
          text: t('trading'),
          path: routesPaths.deal_page
        },
        {
          icon: require('@/assets/home_icon_7@2x.png'),
          text: t('airdrop'),
          path: ''
        },
        {
          icon: require('@/assets/home_icon_8@2x.png'),
          text: t('ecology'),
          path: ''
        },
      ])
      return { 
        banners: banners,
        change,
        t,
        indexAsset, gridItems, onRouter: (path: string) => {
          if (!path) return utils.toast('暂未开放');
          router.push(path)
        },
        onToBill: () => {
          router.push(routesPaths.bill)
        }
      }
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>