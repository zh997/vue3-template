export interface IListItem {
    icon: string,
    title: string,
    path: string
}

export interface IInitState {
    userInfo: IUserInfoResDTO,
    listItemData: IListItem[],
    onRouter: (path: string) => void
    t: (name: string) => string
}