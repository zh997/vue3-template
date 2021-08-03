import { IMoneyConfigResDTO } from '@/services/interface/response';
import { Ref, ref } from 'vue';
import * as services from '@/services/index';
import { IGlobalHooks } from './type';

/** 全局状态 */
export const isShowTabbar: Ref = ref(false);
export const tabbarIndex: Ref = ref(0);
export const money_config: Ref = ref<IMoneyConfigResDTO>();


/** 维护全局状态 */
export const useGlobalHooks = (): IGlobalHooks => {
   
   /** 控制tabbar显示隐藏 */
   const onShowTabbar = (val: boolean, index?: number) => {
      console.log(val);
      isShowTabbar.value = val;
      if (index !== undefined && typeof index === 'number' ) tabbarIndex.value = index;
   }
   
   /** 获取所有配置 */
   const onGetMoneyConfig = async () => {
      const res = await services.money_config();
      money_config.value = res.data;
   }

   /** 返回状态 */
   return { isShowTabbar, tabbarIndex, money_config,  onShowTabbar, onGetMoneyConfig };

}