<!-- 账单 -->
<template>
  <CustomNavBar title="账单" />
  <div class="page-wrap">
      <div class="full-extraction-page">
          <div v-if="record_list && record_list.length > 0">
                    <RecordItem v-for="item in record_list" :key="item.user_id" :item="item"/>
            </div>
            <Empty v-else/>
      </div>
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import { qrcanvas } from 'qrcanvas';
import { useI18n } from "vue-i18n";
import { Empty } from 'vant';
import CustomNavBar from '@/components/custom_nav_bar/index.vue';
import RecordItem from '@/components/record_item/index.vue';
import * as services from '@/services/index';
import * as utils from '@/utils';
import { IBillRecordItemResDTO } from '@/services/interface/response';

export default {
    name: '',
    components: {
       CustomNavBar,
       RecordItem,
       Empty
    },
    setup() {
        const { t } = useI18n();
        const { query } = useRoute();
        const record_list = ref<IBillRecordItemResDTO[]>();

        onMounted(async () => {
            utils.loading('加载中');
            const [list] = await Promise.all([services.money_record()]);
            record_list.value = list.data;
            utils.loadingClean();
            
        })

        return {query, record_list, t}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>