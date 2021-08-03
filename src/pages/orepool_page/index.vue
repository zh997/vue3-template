<!-- 矿池 -->
<template>
    <NavBar :title="t('mining')" fixed/>
    <div class="page-wrap tabbar-page">
        <div class="main-title">
            <span class="main-title-bgtext">HQMC Ore Pit</span>
            <span class="main-title-text">HQMC {{t('mining')}}</span>
            <span class="main-title-line"></span>
        </div>
        <div class="link-btn" @click="onRouter(routerPaths.produce_page)">{{t('currency_production_record')}}</div>
        <!-- <div class="hqctotal-header">
            <span class="hqctotal-header-label">已产出HQC888枚</span>
            <span class="progrecess-item">
                <span class="progrecess-item-cover"></span>
                <span class="progrecess-item-value">10%</span>
            </span>
        </div> -->
        <CardItem v-for="item,index in minerList" :item="item" :btnText="t('open')" :key="index" :index="index+1" :onClick="onButMachine"/>
    </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { Toast, Dialog } from 'vant';
import { NavBar } from 'vant';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
import * as routerPaths from '@/constants/app_routes_path';
import CardItem from '@/components/card_item/index.vue';
import * as services from '@/services/index';
import { IMinerListResDTO } from '@/services/interface/response.d';
import * as utils from '@/utils';

export default {
    name: 'orepoll_page',
    components: {
        NavBar,
        CardItem
    },
    setup() {
        const { t } = useI18n();
        const router = useRouter();
        const minerList = ref<IMinerListResDTO[]>();
        
        const onInitData = async () => {
            try{
              utils.loading(t('loading'));
              const response = await services.minerList();
              minerList.value = response.data;
             utils.loadingClean();
            } catch(err){
              utils.toast(err || err.msg);
            }
        }

        const onButMachine = async (item: IMinerListResDTO) => {
            console.log(item);
            if (item.status_tip === 1) {
                Dialog.confirm({
                    title: t('tips'),
                    message: t('confirm_open'),
                    confirmButtonText: t('confirm'),
                    cancelButtonText: t('cancel')
                })
                .then(async () => {
                    // on confirm
                    utils.loading(t('loading'));
                    await services.buyMachine({id: item.id});
                    Toast.success({message: t('open_successfully'), onClose: () => {
                        onInitData();
                    }})
                })
                .catch(() => {
                    // on cancel
                });
            }
        }

        onMounted(() => {
          onInitData();
        })
        
        return {
            minerList,
            onButMachine,
            t,
            routerPaths,
            onRouter: (path: string) => {
                router.push(path);
            }
        }

    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>