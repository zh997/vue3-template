import { useI18n } from "vue-i18n";
import * as routerPaths from '@/constants/app_routes_path';
import { IListItem } from '../type';

export const listItemData = (): IListItem[] => {
    const { t } = useI18n();
    return [
        {
          icon: require('@/assets/my_icon_1@2x.png'),
          title: t('invite_riends'),
          path: routerPaths.share_page
        },
        {
            icon: require('@/assets/my_icon_2@2x.png'),
            title: t('team_benefits'),
            path: routerPaths.team_income_page
        },
        {
            icon: require('@/assets/my_icon_6@2x.png'),
            title: t('currency_production_record'),
            path: routerPaths.produce_page
        },
        // {
        //     icon: require('@/assets/my_icon_3@2x.png'),
        //     title: '账号安全',
        //     path: routerPaths.my_page
        // },
        {
            icon: require('@/assets/my_icon_5@2x.png'),
            title: t('language_settings'),
            path: routerPaths.lang_switch
        },
        {
            icon: require('@/assets/my_icon_4@2x.png'),
            title: t('platform_introduction'),
            path: routerPaths.plateform_intro_page
        }
    ]
}