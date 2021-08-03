<!-- 交易 -->
<template>
    <NavBar :title="t('trading')" fixed/>
    <div class="page-wrap tabbar-page">
        <List
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            :offset="0"
        >
            <div>
                <div class="v-chart-wrap">
                    <div class="v-chart-title">HQC {{t('chart')}}</div>
                    <v-chart class="v-chart" :option="option" />
                    <div class="v-chart-time-quantum">
                        <div class="time-quantum-item" :class="selectedDateIndex === 1 ? 'time-quantum-active' : ''" @click="onChangeDate(1)">{{t('nearly_one_months')}}</div>
                        <div class="time-quantum-item" :class="selectedDateIndex === 2 ? 'time-quantum-active' : ''" @click="onChangeDate(2)">{{t('nearly_three_months')}}</div>
                        <div class="time-quantum-item" :class="selectedDateIndex === 3 ? 'time-quantum-active' : ''" @click="onChangeDate(3)">{{t('nearly_six_months')}}</div>
                        <div class="time-quantum-item" :class="selectedDateIndex === 4 ? 'time-quantum-active' : ''" @click="onChangeDate(4)">{{t('nearly_one_years')}}</div>
                        <div class="time-quantum-item" :class="selectedDateIndex === 5 ? 'time-quantum-active' : ''" @click="onChangeDate(5)">{{t('nearly_three_years')}}</div>
                    </div>
                </div>
                <div class="selector-bar-wrap">
                    <!-- <div class="selector-bar">
                         <span class="selector-bar-item">HQC</span>
                    </div> -->
                    <div class="switch-bar-head">
                        <div class="switch-bar">
                            <span :class="{'switch-bar-selected': current === 1}" @click="onSwitch(1)">{{t('buy')}}</span>
                            <span :class="{'switch-bar-selected': current === 2}" @click="onSwitch(2)">{{t('sell')}}</span>
                        </div>
                        <!-- <img :src="require('@/assets/icon_record@2x.png')" @click="onShowPopup" alt=""> -->
                    </div>
                    <span @click="onSort">{{sort === 'asc' ? t('asc') :  t('desc')}}<img :src="require('@/assets/icon_down_arrow@2x.png')" alt=""></span> 
                </div>
                <div v-if="tradList && tradList.length > 0">
                    <div class="dealcard-item-wrap" v-for="item in tradList" :key="item.id">
                        <div class="dealcard-item">
                            <div class="dealcard-item-head">
                                <img :src="item.head_img" alt="">
                                <span class="head-title">{{item.username}}</span>
                                <span class="head-subtitle">成交量：{{item.volume || '0'}}</span>
                            </div>
                            <div class="dealcard-item-row">
                                <span class="dealcard-item-row-text">{{t('quantity')}}：{{item?.num}} HQC</span>
                                <span class="dealcard-item-row-value">$ {{item?.total}}</span>
                            </div>
                      
                            <div class="dealcard-item-row">
                                <span class="dealcard-item-row-text">{{t('price')}}：{{item?.price}}</span>
                                <div class="dealcard-item-row-btns">
                                    <span class="dealcard-item-row-btn" @click="onRevoke(item.id)" v-if="item.isscance === 1">{{t('revoke')}}</span>
                                    <span class="dealcard-item-row-btn" @click="onBuyIn(item.id)">{{ current === 1 ? t('purchase') : t('sell_out')}}</span>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <Empty v-else/>
            </div>
            
            
        </List>
        
        <Popup  v-model:show="show" round position="bottom">
         <Picker :title="t('sort')"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            :confirm-button-text="t('confirm')" :cancel-button-text="t('cancel')"
            />
      </Popup>
      <div class="publish-btn" @click="onRouter('/publish_order_page')">
          <img :src="require('@/assets/icon_add@2x.png')" alt="">
      </div>
    </div>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import { NavBar, Toast,  Popup, Picker, List, Empty, Dialog } from 'vant';
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  SingleAxisComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import moment from 'moment';
import * as echarts from "echarts"
// import Header from '@/components/header/index.vue';
import * as services from '@/services/index';
import { IHomeBannerResDTO, ITradeListResDTO,IHqcPriceListResDTO } from '@/services/interface/response.d';
import * as utils from '@/utils';
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  SingleAxisComponent,
  GridComponent
]);

interface ISwitchDateTpe  {
  startDate: string
  endDate: string
}
export default {
    name: '',
      provide: {
      [THEME_KEY]: "light"
    },
    components: {
        // Header,
        VChart,
        NavBar,
        Popup,
        Picker,
        List,
        Empty
    },
    setup() {
        const option = ref();
        const router = useRouter();
        const { t } = useI18n();
        const pageSize: number = 10;
        const selectedDateIndex = ref<number>(4);
        const show = ref<boolean>(false);
        const current = ref<number>(1);
        const page = ref<number>(0);
        const pageTotal = ref<number>(1);
        const sort = ref<string>('asc');
        const order = ref<string>('price');
        const loading = ref<Boolean>(false);
        const finished = ref<Boolean>(false);
        const onShowPopup = () => show.value = true; 
        const columns = [{text: t('create_time'), value: 'created_at'}, {text:  t('price'), value: 'price'}];
        const tradList = ref<ITradeListResDTO[]>();
        const banners = ref<IHomeBannerResDTO[]>([]);
        const onSwitch = (value: number) => {
            current.value = value;
            onGetTradeList(1);
        }

        const onGetDateParams = (index: number) => {
            const today = moment().format('YYYY-MM-DD HH:mm:ss');
            const switchDate: {[key: number]: ISwitchDateTpe} = {
                1: {
                    startDate: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: today
                },
                2: {
                    startDate: moment().subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: today
                },
                3: {
                    startDate: moment().subtract(180, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: today
                },
                4: {
                    startDate: moment().subtract(365, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: today
                },
                5: {
                    startDate: moment().subtract(1095, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: today
                }
            }
            
            return switchDate[index];
        }

        const onChangeDate = async (index: number) => {
            utils.loading(t('loading'));
            selectedDateIndex.value = index;
            const fetchParams = onGetDateParams(index);
            const res = await services.hqc_pirce_list({
                stardate: fetchParams.startDate,
                enddate: fetchParams.endDate
            })
            utils.loadingClean();
            onSetChartOptions(res.data);
        }

        const onSetChartOptions = (price_list: IHqcPriceListResDTO) => {
            const xAxis = Object.keys(price_list);
            const series = [
                {
                    name: t('price'),
                    type: 'line',
                    // smooth:true, 
                    symbol: "none", //去掉圆点 //让曲线变平滑的  
                    lineStyle: {
                        width: 1,
                        color: '#1678FF',
                    },
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(22, 120, 255)'
                        }, {
                            offset: 1,
                            color: 'rgba(255, 255, 255)'
                        }])
                    },
                    data: Object.values(price_list),
                },
              ];
              option.value = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    top: '6%',
                    bottom: '6%',
                    containLabel: true
                    // height: "100%"
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    triggerEvent: true,
                    axisLabel: {
                        textStyle: {
                            color: '#b6b6b6'
                        },
                        showMaxLabel:true, // 展示最大值
                        showMinLabel:true, // 展示最小值
                        formatter: function(value: string, index: number){
                            if(index === 0) {
                                return '                 ' + value;
                            }
                            if(index === xAxis.length -1) {
                                return value + '                 ';
                            }
                            return value;
                        }
                    },
                    data: xAxis
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#b6b6b6'
                        }
                    }
                },
                series:series
             }
        }

        const onGetTradeList = async (pageIndex: number) => {
            if (loading.value) return false;
            try {
                utils.loading(t('loading'));
                loading.value = true;
                const res = await services.tradeList({
                    page: pageIndex,
                    size: pageSize,
                    type: current.value,
                    sort: sort.value,
                    order: order.value
                });
                utils.loadingClean();
                const pageNum = Math.ceil(res.data.total / pageSize);
                if (pageIndex > 1) {
                  tradList.value = tradList.value?.concat(res.data.list);
                } else {
                  tradList.value = res.data.list
                }
                pageTotal.value = pageNum;
                finished.value = pageIndex >= pageNum;
                page.value = pageIndex;
                loading.value = false;
                return res;
            } catch(err) {
                loading.value = false;
            }
        }

        const onBuyIn = async (id: number) => {
            Dialog.confirm({
                title: t('tips'),
                message: `${current.value === 1 ? t('confirm_buy') : t('confirm_sell')}？`,
                confirmButtonText: t('confirm'),
                    cancelButtonText: t('cancel')
            })
            .then(async () => {
                // on confirm
                utils.loading(t('loading'));
                if (current.value === 1) {
                    await services.buyIn({id: id});
                    Toast.success({message: t('successful_purchase')});
                }
                if (current.value === 2) {
                    await services.sellOut({id: id});
                    Toast.success({message: t('sold_successfully'), onClose: () => {
                        onGetTradeList(1);
                    }});
                }
            })
            .catch(() => {
                // on cancel
            });
        }

        const onRevoke = async (id: number) => {
            Dialog.confirm({
                title: '提示',
                message: '确定要撤销吗？',
            })
            .then(async () => {
                // on confirm
                utils.loading(t('loading'));
                await services.revokeorder({id: id});
                Toast.success({message: t('revoke_successfully'), onClose: () => {
                    onGetTradeList(1);
                }});
            })
            .catch(() => {
                // on cancel
            });
        }

        const onLoad = () => {
           if ( page.value < pageTotal.value) onGetTradeList(page.value + 1);
        }

        const onSort = () => {
            sort.value = sort.value === 'asc' ? 'desc' : 'asc';
            onGetTradeList(1);
        }
        
        onMounted(()=> {
            onChangeDate(selectedDateIndex.value);
        })
        
        const onConfirm = (item: {value: string, text: string}) => {
           show.value = false;
           order.value = item.value;
           onGetTradeList(1);
        };
        const onCancel = () => show.value = false;

        const onRouter = (path: string) => {
            router.push(path);
        }

        return {current, banners, tradList, sort, columns, show,loading, finished, option,selectedDateIndex, t,onRevoke, onChangeDate, onRouter, onSwitch, onBuyIn, onSort, onShowPopup, onConfirm, onCancel, onLoad}
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>