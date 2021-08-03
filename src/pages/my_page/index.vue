<!-- 个人中心 -->
<template>
  <div class="tabbar-page">
    <div class="my-header">
        <div class="my-avatar">
            <div class="avatar-clip">
                <van-image
                    round
                    fit="cover"
                    :src="userInfo?.head_img"
                />
            </div>
            <img :src="require('@/assets/member_grade@2x.png')" class="member-grade" alt="">
        </div>
        <span class="my-nickname">{{userInfo?.name || '--'}}</span>
        <span class="my-member-status">{{t('member_status')}}: {{userInfo?.activate === 0 ? t('invalid_member') : t('effective_member')}}</span>
        <img :src="require('@/assets/icon_edit@2x.png')" class="icon-edit" @click="onRouter('/edit_profile')" alt="">
    </div>
    <div class="list-item-wrap">
        <div class="list-item" v-for="item,index in listItemData" :key="index" @click="onRouter(item.path)">
            <div class="list-item-label">
                <img :src="item.icon" alt="">
                <span>{{item.title}}</span>
            </div>
            <img :src="require('@/assets/icon_right_arrow@2x.png')" alt="">
        </div>
    </div>
    
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Image as VanImage } from 'vant';
import { useI18n } from "vue-i18n";
import { listItemData } from './hooks/useInit';
import { IInitState } from './type.d';
import * as services from '@/services/index';
import { IUserInfoResDTO } from '@/services/interface/response.d';
import * as utils from '@/utils';


export default {
    name: 'my_page',
    components:{
        VanImage
    },
    setup(): IInitState {
        const router = useRouter();
        const { t } = useI18n();
        const userInfo = ref<IUserInfoResDTO>();
        onMounted(async () => {
           try {
               utils.loading('加载中');
               const response = await services.userCenter();
               userInfo.value = response.data;
               utils.loadingClean()
           } catch(err) {
               utils.toast(err || err.msg);
           }
        })
        return {
            userInfo,
            listItemData: listItemData(),
            t,
            onRouter: (path: string) => {
                router.push(path);
            }
        }
    },
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>