export interface responseItem<T> {
  code: number,
  data: T,
  message: string
}

export interface getRequestItem<T> {
  method: string,
  query: T
}

export interface postRequestItem<T> {
  method: string,
  body: T
}

export interface pageDataItem<T> {
  records: T,
  total: number,
  size: number,
  current: number,
  pages: number
}

export interface pageResponseItem<T> {
  code: number,
  data: pageDataItem<T>,
  message: string
}

export interface pageRequestItem {
  page: number,
  size: number
}

export interface deleteRequestItem {
  id: number
}

export interface loginItem {
  email: string,
  password: string
}

export interface infoItem {
  id: number,
  name: string,
  gender?: number,
  location?: string
}

export interface checkItem {
  check: boolean,
  info: infoItem
}