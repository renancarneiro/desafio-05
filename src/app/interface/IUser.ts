import { Types } from 'mongoose'

export interface IUser {
  email: string
  password: string
}

export interface IUserResponse {
  email: string
  password?: string
  _id: Types.ObjectId
  __v?: number
  token?: string
}

export interface IUserResponseAuth {
  token: string
  user: IUserResponse
}
