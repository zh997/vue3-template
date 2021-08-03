/** 登录 */
export interface IAuthLoginResDTO {
    token: string
}

/** 首页banner */
export interface IHomeBannerResDTO {
    name: string
    banner: string
}

/** 首页资产 */
export interface IHomeAssetResDTO {
    money: string
    hqc_money: string
    hqmc_money: string
}

/** 首页-USDT */
export interface IHomeWalletUsdtResDTO {
    user_id: number
    money: string
    usdt_wallet: string
}

/** 首页-USDT */
export interface IHomeWalletHqcResDTO {
    user_id: number
    hqc_money: string
    hqc_wallet: string
}

/** 首页-HQMC */
export interface IHomeHqmcMoneyResDTO {
    user_id: number
    hqmc_money: string
}

/** 推荐奖励 */
export interface IShareAwardResDTO {
    user_info: {
        id: number
        name: string
    }
    direct_list: {
        id: number
        name: string
        has_div: string
        performance: string
        group_num: number
    }
}

/** 矿池列表 */
export interface IMinerListResDTO {
    end_time: string
    expected_consume_actual: number
    expected_consume_end: number
    expected_consume_start: number
    expected_outpu_actual: number
    expected_outpu_end: number
    expected_outpu_start: number
    id: number
    img: string
    name: string
    no: string
    output: string
    price: string
    start_time: string
    status: number
    status_tip: number
}

/** 用户中心 */
export interface IUserInfoResDTO {
    activate: number
    head_img: string
    id: number
    level: number
    name: string
}

/** 邀请好友 */
export interface IShareInfoResDTO {
    code: string
    id: number
    name: string
    share_url: string
}

/** 团队收益 */
export interface ITeamBenefitsResDTO {
    profit_info: {total_profit: number, mining_profit: number, share_profit:number, team_profit: number}
    store_info: {money: string, hqc_money: string, hqmc_money: string}
}

/** 交易列表 */
export interface ITradeListResDTO {
    created_at: string
    id: number
    num: number
    price: string
    total: string
    type: number
    user_id: number
    username: string
    head_img:string
}

/** 产币记录 */
export interface ICoinProfitResDTO {
    id: number
    user_id: number
    no: string
    machine_price: string
    expected_consume_start: number
    expected_consume_end: number
    expected_outpu_start: number
    expected_outpu_end: number
    created_at: string
    end_time: string
}

/** 平台介绍 */
export interface IPlatFormResDTO {
    id: number
    type: number
    title: string
    content: string
    created_at: number
    updated_at: number
}

/** 收益记录 */
export interface IIncomeListResDTO {
    id: number
    user_id: number
    total: string
    money_name: string
    type: number
    created_at: string
}

/** 资金设置 */
export interface IMoneyConfigResDTO {
    change_config:{
        change_dec_usdt: string
        change_dec_hqc: string
        change_dec_multipe: string
    }
    destory_config: {
        destory_dec_usdt: string
        destory_dec_hqc: string
        destory_dec_multipe: string
    }
    hqc_config: {
        hqmc_transfer_fee: string
    }
    price_config: {
        hqc_hqmc_price: string
        hqmc_usdt_price: string
    }
    withdraw_config: {
        withdraw_rate: string
        withdraw_min: string
    }
}

/** HQC价格走势 */
export interface IHqcPriceListResDTO {
    [key: string]: string
}

/** 记录 */
export interface IRecordItemResDTO {
    user_id: number
    total: string
    money_name: string
    type: number
    content: string
    created_at: string
}


/** 所有记录/账单 */
export interface IBillRecordItemResDTO {
    id: number
    user_id: number
    type: string
    content: string
    content: string
    created_at: string
}