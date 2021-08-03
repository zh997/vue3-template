<!-- 首页 -->
<template>
  <Tabbar v-model="tabbarIndex" @change="onChange">
    <TabbarItem v-for="item, index in tabbar" :key="index" :to="item.path">
       <span>{{item.title}}</span>
       <template #icon="props">
          <img :src="props.active ? item.selected_icon : item.icon" />
       </template>
    </TabbarItem>
  </Tabbar>
</template>

<script lang='ts'>
import { reactive } from 'vue'
import { Tabbar, TabbarItem } from 'vant';
import { useI18n } from "vue-i18n";
import { ITabbarItem } from './type';
import { useGlobalHooks } from '@/hooks';
export default {
    name: 'home_page',
    components: {
        Tabbar,
        TabbarItem
    },
    setup() {
      const { t } = useI18n();
      const tabbar = reactive<ITabbarItem[]>([
        {
          icon: require('@/assets/tabbar_icon_home@2x.png'),
          selected_icon: require('@/assets/tabbar_icon_home_selected@2x.png'),
          title: t('home'),
          path: '/home'
        },
        {
          icon: require('@/assets/tabbar_icon_orepool@2x.png'),
          selected_icon: require('@/assets/tabbar_icon_orepool_selected@2x.png'),
          title: t('mining'),
          path: '/orepool'
        },
        {
          icon: require('@/assets/tabbar_icon_deal@2x.png'),
          selected_icon: require('@/assets/tabbar_icon_deal_selected@2x.png'),
          title: t('trading'),
          path: '/deal'
        },
        {
          icon: require('@/assets/tabbar_icon_my@2x.png'),
          selected_icon: require('@/assets/tabbar_icon_my_selected@2x.png'),
          title: t('mine'),
          path: '/my'
        }
      ])

      return {
          tabbar,
          ...useGlobalHooks()
      };
    }
  };
</script>
<style scoped>
</style>