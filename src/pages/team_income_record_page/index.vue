<!-- 团队收益记录 -->
<template>
  <CustomNavBar :title="`${query.name}`"/>
  <div class="page-wrap">
      <!-- <div class="team-income-record-page" v-if="list && list.length > 0">
          <table class="table-wrap">
              <tr class="table-header">
                  <td class="table-header-cell">{{t('currency')}}</td>
                  <td class="table-header-cell">{{t('amount')}}</td>
                  <td class="table-header-cell">{{t('type')}}</td>
                  <td class="table-header-cell">{{t('time')}}</td>
              </tr>
              <tr class="table-row" v-for="item in list" :key="item.id">
                  <td class="table-row-cell">{{item.money_name}}</td>
                  <td class="table-row-cell">{{item.total}}</td>
                  <td class="table-row-cell">
                      {{item.type === 1 ? t('pool_income') : ''}}
                      {{item.type === 2 ? t('share_income') : ''}}
                      {{item.type === 3 ? t('team_benefits') : ''}}
                  </td>
                  <td class="table-row-cell">{{item.created_at}}</td>
              </tr>
          </table>
      </div>
      <Empty v-else/> -->
      <div class="team_income_record_page">
           <div v-if="list && list.length > 0">
                <RecordItem v-for="item in list" :key="item.user_id" :item="item"/>
        </div>
        <Empty v-else/>
      </div>
       
  </div>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
import { Empty } from 'vant';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import RecordItem from '@/components/record_item/index.vue';
import * as services from '@/services/index';
import * as utils from '@/utils';
import { IIncomeListResDTO } from '@/services/interface/response.d';

export default {
    name: '',
    components: {
        CustomNavBar,
        Empty,
        RecordItem
    },
    setup() {
        const { t } = useI18n();
        const { query } = useRoute();
        const list = ref<IIncomeListResDTO[]>();
        const onGetIncomeList = async () => {
            utils.loading(t('loading'));
            const res = await services.income_list({type: query.type?.toString()});
            list.value = res.data;
            utils.loadingClean()
        }
        onMounted(() =>{
            onGetIncomeList();
        })
       return {list, query, t}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>