<!-- 资产详情 -->
<template>
  <CustomNavBar title="资产详情" />
  <div class="page-wrap">
      <div class="assets-info-page">
          <div class="assets-head">
              <span class="assets-head-label">{{query.name}} 当前余额</span>
              <span class="assets-head-value">888.00</span>
          </div>
          <div class="assets-btn-group">
              <div class="assets-btn-item" v-for="item,index in btnItems" :key="index" @click="onRouter(item.path)">{{item.text}}</div>
          </div>
          <div class="assets-card-item">
              <div class="assets-card-item-row">
                  <span class="assets-card-item-row-label">种类：</span>
                  <span class="assets-card-item-row-value">{{query.name}}</span>
              </div>
              <div class="assets-card-item-row">
                  <span class="assets-card-item-row-label">数量：</span>
                  <span class="assets-card-item-row-value">888</span>
              </div>
              <div class="assets-card-item-row">
                  <span class="assets-card-item-row-label">类型：</span>
                  <span class="assets-card-item-row-value">充币</span>
              </div>
              <div class="assets-card-item-row">
                  <span class="assets-card-item-row-label">时间：</span>
                  <span class="assets-card-item-row-value">2021.06.26 21:55:00</span>
              </div>
          </div>
          <div class="assets-card-item">
              <div class="assets-card-item-row">
                  <span class="assets-card-item-row-label">种类：</span>
                  <span class="assets-card-item-row-value">{{query.name}}</span>
              </div>
              <div class="assets-card-item-row">
                  <span class="assets-card-item-row-label">数量：</span>
                  <span class="assets-card-item-row-value">888</span>
              </div>
              <div class="assets-card-item-row">
                  <span class="assets-card-item-row-label">类型：</span>
                  <span class="assets-card-item-row-value">充币</span>
              </div>
              <div class="assets-card-item-row">
                  <span class="assets-card-item-row-label">时间：</span>
                  <span class="assets-card-item-row-value">2021.06.26 21:55:00</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script lang='ts'>
import { } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import * as routerPaths from '@/constants/app_routes_path';
export default {
    name: '',
    components: {
       CustomNavBar
    },
    setup() {
        const { query } = useRoute();
        const router = useRouter();
        const btnItems = [
            {
                text: '充币',
                path: routerPaths.charge_page
            },
            {
                text: '提币',
                path: routerPaths.withdraw_page
            },
            {
                text: '兑换',
                path: routerPaths.exchange_page
            },
            {
                text: '销毁',
                path: routerPaths.destroy_page
            }
        ]
        return {query, btnItems,onRouter: (path: string) => {
                router.push(path);
            }}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>