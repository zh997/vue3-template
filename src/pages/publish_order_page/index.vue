<!-- 订单发布 -->
<template>
    <CustomNavBar :title="t('order_release')"/>
    <div class="page-wrap">
        <div class="publish-order-page">
            <div class="publish-order-tab">
                <div class="publish-order-tabitem" :class="type === 1 ? 'tabitem-active': '' " @click="onSwitchTab(1)">{{t('sell_money')}}</div>
                <div class="publish-order-tabitem" :class="type === 2 ? 'tabitem-active': '' " @click="onSwitchTab(2)">{{t('buy_money')}}</div>
            </div>
            <div class="publish-order-form">
                <div class="publish-order-formitem">
                    <div class="publish-order-formitem-label">{{t('price')}}：</div>
                    <div class="publish-order-formitem-value">
                        <input type="number" v-model="price" :placeholder="t('price_placeholder')">
                        <div class="publish-order-formitem-sufix">USDT</div>
                    </div>
                </div>
                <div class="publish-order-formitem">
                    <div class="publish-order-formitem-label">{{t('trading_capacity')}}：</div>
                    <div class="publish-order-formitem-value">
                        <input type="number" v-model="num" :placeholder="t('transaction_quantity_placeholder')">
                        <!-- <div class="publish-order-formitem-sufix"></div> -->
                    </div>
                </div>
            </div>
            <Button type="primary" size="large" @click="onSubmit">{{t('publish')}}</Button>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref } from 'vue';
import { Button, Toast } from 'vant';
import { useI18n } from "vue-i18n";
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import * as services from '@/services/index';
import * as utils from '@/utils';

export default {
    name: 'publish-order-page',
    components:{
        CustomNavBar,
        Button
    },
    setup() {
       const type = ref<number>(1);
       const { t } = useI18n();
       const price = ref<string>('');
       const num = ref<string>('');
       const onSwitchTab = (value: number) => type.value = value;
       const onSubmit = async () => {
            utils.loading(t('loading'));
            if (price.value && num.value) {
                await services.releaeOrder({
                    type: type.value,
                    price: price.value,
                    num: Number(num.value)
                });
                Toast.success(t('published_successfully'));
            } else {
                Toast(t('transaction_quantity_and_price_reqired'));
            }
            
       }
       return {type, price, num, t, onSwitchTab, onSubmit}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>