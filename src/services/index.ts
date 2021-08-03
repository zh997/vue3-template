import request from "@/request";
import { IAuthLoginReqDTO, IUsdtWithdrawReqDTO, IHqcTransferReqDTO, ITradeListReqDTO,IReleaeOrderReqDTO } from "./interface/request.d";
import * as api from '@/constants/api_url';
import { IAuthLoginResDTO, 
    IHomeBannerResDTO, 
    IHomeWalletUsdtResDTO, 
    IHomeAssetResDTO, 
    IShareAwardResDTO,
    IMinerListResDTO,
    IUserInfoResDTO,
    IShareInfoResDTO,
    ITeamBenefitsResDTO,
    IHomeWalletHqcResDTO,
    IHomeHqmcMoneyResDTO,
    ITradeListResDTO,
    ICoinProfitResDTO,
    IPlatFormResDTO,
    IMoneyConfigResDTO,
    IIncomeListResDTO,
    IHqcPriceListResDTO,
    IRecordItemResDTO,
    IBillRecordItemResDTO
 } from "./interface/response.d";
import { ResponseDTO, ResponseListDTO } from "@/typing";

/** 授权登录 */
export async function authLogin(params: IAuthLoginReqDTO): Promise<ResponseDTO<IAuthLoginResDTO>> {
    return await request({url: api.authLogin, method: 'POST', data: params});
}

/** 首页banner */
export async function homeBanner(params: {lang: string}): Promise<ResponseDTO<IHomeBannerResDTO[]>> {
    return await request({url: api.basic_banner, method: 'POST', data: params });
}

/** 首页资产 */
export async function homeWalletAsset(): Promise<ResponseDTO<IHomeAssetResDTO>> {
    return await request({url: api.index_asset, method: 'POST'});
}

/** 首页-USDT */
export async function homeWalletUsdt(): Promise<ResponseDTO<IHomeWalletUsdtResDTO>> {
    return await request({url: api.wallet_usdt, method: 'POST'});
}

/** 首页-HQC */
export async function homeWalletHqc(): Promise<ResponseDTO<IHomeWalletHqcResDTO>> {
    return await request({url: api.wallet_hqc, method: 'POST'});
}

/** 推荐奖励 */
export async function shareAward(): Promise<ResponseDTO<IShareAwardResDTO>> {
    return await request({url: api.share_award, method: 'POST'});
}

/** 矿池列表 */
export async function minerList(): Promise<ResponseDTO<IMinerListResDTO[]>> {
    return await request({url: api.miner_list, method: 'POST'});
}

/** 用户中心 */
export async function userCenter(): Promise<ResponseDTO<IUserInfoResDTO>> {
    return await request({url: api.user_center, method: 'POST'});
}

/** 邀请好友 */
export async function shareInfo(): Promise<ResponseDTO<IShareInfoResDTO>> {
    return await request({url: api.share_qrcode, method: 'POST'});
}

/** 团队收益 */
export async function teamBenefits(): Promise<ResponseDTO<ITeamBenefitsResDTO>> {
    return await request({url: api.team_benefits, method: 'POST'});
}

/** USDT-提现 */
export async function usdtWithdraw(params: IUsdtWithdrawReqDTO): Promise<ResponseDTO<ITeamBenefitsResDTO>> {
    return await request({url: api.usdt_withdraw, method: 'POST', data: params});
}

/** HQC-转让 */
export async function hqcTransfer(params: IHqcTransferReqDTO): Promise<ResponseDTO<ITeamBenefitsResDTO>> {
    return await request({url: api.hqc_transfer, method: 'POST', data: params});
}

/** 首页-HQMC */
export async function hqcMoney(): Promise<ResponseDTO<IHomeHqmcMoneyResDTO>> {
    return await request({url: api.hqmc_money, method: 'POST'});
}

/** HQMC转让 */
export async function hqmcTransfer(params: IHqcTransferReqDTO): Promise<ResponseDTO<IHomeHqmcMoneyResDTO>> {
    return await request({url: api.hqmc_transfer, method: 'POST', data: params});
}

/** HQMC兑换 */
export async function hqmcChange(params: {num: number}): Promise<ResponseDTO<IHomeHqmcMoneyResDTO>> {
    return await request({url: api.hqmc_change, method: 'POST', data: params});
}

/** HQMC销毁 */
export async function hqmcDestory(params: {num: number}): Promise<ResponseDTO<IHomeHqmcMoneyResDTO>> {
    return await request({url: api.hqmc_destory, method: 'POST', data: params});
}

/** 购买矿机 */
export async function buyMachine(params: {id: number}): Promise<ResponseDTO<IHomeHqmcMoneyResDTO>> {
    return await request({url: api.buy_machine, method: 'POST', data: params});
}

/** 交易列表 */
export async function tradeList(params: ITradeListReqDTO): Promise<ResponseListDTO<ITradeListResDTO>> {
    return await request({url: api.tradeList, method: 'POST', data: params});
}

/** 买入 */
export async function buyIn(params: {id: number}): Promise<ResponseListDTO<[]>> {
    return await request({url: api.buyIn, method: 'POST', data: params});
}

/** 买出 */
export async function sellOut(params: {id: number}): Promise<ResponseListDTO<[]>> {
    return await request({url: api.sellOut, method: 'POST', data: params});
}

/** 发布订单 */
export async function releaeOrder(params: IReleaeOrderReqDTO): Promise<ResponseDTO<[]>> {
    return await request({url: api.releaeOrder, method: 'POST', data: params});
}

/** 产币记录 */
export async function coinProfit(): Promise<ResponseDTO<ICoinProfitResDTO[]>> {
    return await request({url: api.coin_profit, method: 'POST'});
}

/** 平台介绍 */
export async function plat_form(): Promise<ResponseDTO<IPlatFormResDTO[]>> {
    return await request({url: api.plat_form, method: 'POST'});
}

/** 团队收益记录 */
export async function income_list(params: {type: string | null | undefined}): Promise<ResponseDTO<IIncomeListResDTO[]>> {
    return await request({url: api.income_list, method: 'POST', data: params});
}

/** 资金设置 */
export async function money_config(): Promise<ResponseDTO<IMoneyConfigResDTO>> {
    return await request({url: api.money_config, method: 'POST'});
}

/** 上传图片 */
export async function upload_img(data: FormData): Promise<ResponseDTO<{pathUrl: string, path: string}>> {
    return await request({url: api.upload_img, method: 'POST', headers: {
        'Content-Type': 'multipart/form-data'
    }, data: data});
}

/** 修改头像 */
export async function change_head_img(params: { avatar: string}): Promise<ResponseDTO<IMoneyConfigResDTO>> {
    return await request({url: api.change_head_img, method: 'POST', data: params});
}

/** HQMC资金记录 */
export async function moneyope_hqmc_list(): Promise<ResponseDTO<IRecordItemResDTO[]>> {
    return await request({url: api.moneyope_hqmc_list, method: 'POST'});
}

/** USDT资金记录 */
export async function moneyope_usdt_list(): Promise<ResponseDTO<IRecordItemResDTO[]>> {
    return await request({url: api.moneyope_usdt_list, method: 'POST'});
}

/** HQC资金记录 */
export async function moneyope_hqc_list(): Promise<ResponseDTO<IRecordItemResDTO[]>> {
    return await request({url: api.moneyope_hqc_list, method: 'POST'});
}

/** HQC价格走势 */
export async function hqc_pirce_list(params: {stardate: string, enddate: string}): Promise<ResponseDTO<IHqcPriceListResDTO>> {
    return await request({url: api.hqc_pirce_list, method: 'POST', data: params});
}

/** 所有资金记录/账单 */
export async function money_record(): Promise<ResponseDTO<IBillRecordItemResDTO[]>> {
    return await request({url: api.money_record, method: 'POST'});
}

/** 撤销 */
export async function revokeorder(params: {id: number}): Promise<ResponseDTO<[]>> {
    return await request({url: api.revokeorder, method: 'POST', data:params});
}

/** 团队收益文案 */
export async function quotes(): Promise<ResponseDTO<{content: string}>> {
    return await request({url: api.quotes, method: 'POST'});
}
