export interface IGlobalHooksState {
    isShowTabbar: Ref<boolean>
    tabbarIndex: Ref<number>
    money_config: Ref<IMoneyConfigResDTO>
}

export interface IGlobalHooksDispatch {
    onShowTabbar: (val: boolean, index?: number) => void
    onGetMoneyConfig: () => Promise<void>
}

export interface IGlobalHooks extends IGlobalHooksState,IGlobalHooksDispatch{};