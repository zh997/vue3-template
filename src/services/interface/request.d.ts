/** 登录 */
export interface IAuthLoginReqDTO {
    name: string
    code: string
}

/** USDT提现 */
export interface IUsdtWithdrawReqDTO {
    receive_address: LocationQueryValue | LocationQueryValue[]
    money_type: string
    num: number
}

/** HQC转让 */
export interface IHqcTransferReqDTO {
    address: string
    money_type: string
    num: number
}

/** 交易列表 */
export interface ITradeListReqDTO {
    page: number
    size: number
    order?: string
    sort?: string
    type: number
}

/** 订单发布 */
export interface IReleaeOrderReqDTO {
    num: number
    price: string
    type: number
}