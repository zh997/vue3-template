export interface ResponseDTO<T>{
  code: number
  msg: string
  data: T
}

export interface ResponseListDTO<T>{
  code: number
  msg: string
  data: {
    total: number
    list: T[]
  }
}