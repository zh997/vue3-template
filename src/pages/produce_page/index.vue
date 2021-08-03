<!-- 产币记录 -->
<template>
    <CustomNavBar :title="t('currency_production_record')"/>
    <div class="page-wrap">
        <div class="produce-page" v-if="list && list.length > 0">
            <CardItem :showBtn="false" v-for="item in list" :key="item.id" :item="item" :showHead="false"/>
            <!-- <CardItem btnText="已加入" :disabeld="true" :showHead="false"/>
            <CardItem btnText="已加入" :disabeld="true" :showHead="false"/> -->
        </div>
        <Empty v-else/>
    </div>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
import { Empty } from 'vant';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import CardItem from '@/components/card_item/index.vue';
import * as services from '@/services/index';
import * as utils from '@/utils';
import { ICoinProfitResDTO } from '@/services/interface/response.d';

export default {
    name: 'produce-page',
    components:{
        CustomNavBar,
        CardItem,
        Empty
    },
    setup() {
        const { t } = useI18n();
        const list = ref<ICoinProfitResDTO[]>();
        const onGetCoinProfit = async () => {
            utils.loading(t('loading'));
            const res = await services.coinProfit();
            list.value = res.data;
            utils.loadingClean()
        }
        onMounted(() =>{
            onGetCoinProfit();
        })
        return { list, t }
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>