import { Types } from 'mongoose'

export interface IProduct {
  title: string
  description: string
  department: string
  bar_codes: string
  brand: string
  price: number
  qtd_stock: number
  stock_control_enabled?: boolean
}

export interface IProductResponse {
  title: string
  description: string
  department: string
  bar_codes: string
  brand: string
  price: number
  qtd_stock: number
  _id: Types.ObjectId
  stock_control_enabled?: boolean
  __v?: number
}

export interface IQueryGet {
  qtd_stock?: object
  department?: string
  brand?: string
  limit?: number
  page?: number
}

export interface IMapperField {
  type: string
  fieldProduct: string
  fieldMarket: string
  optional?: Array<string>
}

export interface IMapper {
  fields: Array<IMapperField>
}
