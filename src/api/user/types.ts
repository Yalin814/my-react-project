export interface UserInfo {
  userName: string
  password: string
  Sex: string
  age: number
  phone: string
  major: string
}

export interface GetUserInfoReq {
  phone: string
  password: string
}
