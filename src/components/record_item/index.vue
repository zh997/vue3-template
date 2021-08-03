<!-- 记录 -->
<template>
   <div class="record-item">
       <!-- <div class="record-item-row">
           <div class="record-item-row-label">币种：</div>
           <div class="record-item-row-value">{{item?.money_name}}</div>
       </div>
       <div class="record-item-row">
           <div class="record-item-row-label">数量：</div>
           <div class="record-item-row-value">{{item.total}}</div>
       </div> -->
       <div class="record-item-row">
           <div class="record-item-row-label">类型：</div>
           <div class="record-item-row-value">{{item.content}}</div>
       </div>
       <div class="record-item-row">
           <div class="record-item-row-label">时间：</div>
           <div class="record-item-row-value">{{item.created_at}}</div>
       </div>
   </div>
</template>

<script lang='ts'>
import { PropType } from 'vue';
import { IRecordItemResDTO } from '@/services/interface/response';
export default {
    name: '',
    components: {
      
    },
    props: {
       item: {
           type: Object as PropType<IRecordItemResDTO>,
           default: () => ({})
       }
    },
    setup() {
       return {}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>