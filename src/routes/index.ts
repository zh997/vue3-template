import { RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import Loading from '@/components/loading/index.vue';
import * as routePath from '@/constants/app_routes_path';

const HomePage = defineAsyncComponent(() => import('@/pages/home_page/index.vue'));
const OrepoolPage = defineAsyncComponent(() => import('@/pages/orepool_page/index.vue'));
const DealPage = defineAsyncComponent(() => import('@/pages/deal_page/index.vue'));
const MyPage = defineAsyncComponent(() => import('@/pages/my_page/index.vue'));
const TeamIncomePage = defineAsyncComponent(() => import('@/pages/team_income_page/index.vue'));
const TeamIncomeRecordPage = defineAsyncComponent(() => import('@/pages/team_income_record_page/index.vue'));
const MyTeamPage = defineAsyncComponent(() => import('@/pages/my_team_page/index.vue'));
const SharePage = defineAsyncComponent(() => import('@/pages/share_page/index.vue'));
const ProducePage = defineAsyncComponent(() => import('@/pages/produce_page/index.vue'));
const PlateformIntroPage = defineAsyncComponent(() => import('@/pages/plateform_intro_page/index.vue'));
const AssetsInfoPage = defineAsyncComponent(() => import('@/pages/assets_info_page/index.vue'));
const ChargePage = defineAsyncComponent(() => import('@/pages/charge_page/index.vue'));
const WithdrawPage = defineAsyncComponent(() => import('@/pages/withdraw_page/index.vue'));
const ExchangePage = defineAsyncComponent(() => import('@/pages/exchange_page/index.vue'));
const DestroyPage = defineAsyncComponent(() => import('@/pages/destroy_page/index.vue'));
const FullExtractionPage = defineAsyncComponent(() => import('@/pages/full_extraction_page/index.vue'));
const HqmcInfoPage = defineAsyncComponent(() => import('@/pages/hqmc_info_page/index.vue'));
const TransformPage = defineAsyncComponent(() => import('@/pages/transform_page/index.vue'));
const TransformConfirmPage = defineAsyncComponent(() => import('@/pages/transform_confirm_page/index.vue'));
const PublishOrderPage = defineAsyncComponent(() => import('@/pages/publish_order_page/index.vue'));
const PlateformIntroDetail = defineAsyncComponent(() => import('@/pages/plateform_intro_detail_page/index.vue'));
const EditProfile = defineAsyncComponent(() => import('@/pages/edit_profile_paege/index.vue'));
const LangSwitch = defineAsyncComponent(() => import('@/pages/lang_switch_page/index.vue'));
const BillPage = defineAsyncComponent(() => import('@/pages/bill_page/index.vue'));

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: routePath.home_page,
        props: {
            isShowTabbar: true
        }
    },
    {
        path:  routePath.home_page,
        component: HomePage
    },
    {
        path:  routePath.orepool_page,
        component: OrepoolPage
    },
    {
        path:  routePath.deal_page,
        component: DealPage
    },
    {
        path:  routePath.my_page,
        component: MyPage
    },
    {
        path:  routePath.team_income_page,
        component: TeamIncomePage
    },
    {
        path:  routePath.team_income_record_page,
        component: TeamIncomeRecordPage
    },
    {
        path:  routePath.my_team_page,
        component: MyTeamPage
    },
    {
        path:  routePath.share_page,
        component: SharePage
    },
    {
        path:  routePath.produce_page,
        component: ProducePage
    },
    {
        path:  routePath.plateform_intro_page,
        component: PlateformIntroPage
    },
    {
        path:  routePath.assets_info_page,
        component: AssetsInfoPage
    },
    {
        path:  routePath.charge_page,
        component: ChargePage
    },
    {
        path:  routePath.withdraw_page,
        component: WithdrawPage
    },
    {
        path:  routePath.exchange_page,
        component: ExchangePage
    },
    {
        path:  routePath.destroy_page,
        component: DestroyPage
    },
    {
        path:  routePath.full_extraction_page,
        component: FullExtractionPage
    },
    {
        path:  routePath.hqmc_info_page,
        component: HqmcInfoPage
    },
    {
        path:  routePath.transform_page,
        component: TransformPage
    },
    {
        path:  routePath.transform_confirm_page,
        component: TransformConfirmPage
    },
    {
        path:  routePath.publish_order_page,
        component: PublishOrderPage
    },
    {
        path:  routePath.plateform_intro_detail_page,
        component: PlateformIntroDetail
    },
    {
        path:  routePath.edit_profile_page,
        component: EditProfile
    },
    {
        path:  routePath.lang_switch,
        component: LangSwitch
    },
    {
        path:  routePath.bill,
        component: BillPage
    },
]

export default routes;