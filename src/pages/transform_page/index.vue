<!-- 互转 -->
<template>
  <CustomNavBar title="互转" />
  <div class="page-wrap">
      <div class="blance-notify">可用余额：888</div>
      <div class="transform_page">
          <div class="transform-form-panel">
              <div class="transform-form-item">
                  <div class="transform-form-item-label">账户名：</div>
                  <input type="text" placeholder="请输入账户名" class="transform-form-item-value">
              </div>
              <div class="transform-form-item">
                  <div class="transform-form-item-label">转账数量：</div>
                  <input type="text" placeholder="请输入转账数量" class="transform-form-item-value">
              </div>
              <div class="transform-form-item">
                  <div class="transform-form-item-label">交易密码：</div>
                  <input type="text" placeholder="请输入交易密码" class="transform-form-item-value">
              </div>
              <div class="withdraw-btn" @click="onRouter">转账</div>
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
        return {query,onRouter: () => {
                router.push(routerPaths.transform_confirm_page);
            }}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>