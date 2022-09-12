import { PaginateResult } from 'mongoose'

import { IProduct, IProductResponse, IQueryGet } from '../interface/IProduct'
import ProductSchema from '../schema/ProductSchema'
import customLabels from '../../utils/customLabels'



class ProductRepository {
  public async create (payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload)
  }


  public async get (payload: IQueryGet, page: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    return ProductSchema.paginate({ $and: [payload, { stock_control_enabled: true }] },
      { page, customLabels, limit, sort: { qtd_stock: 1 } })
  }


  public async getById (id: string): Promise<IProductResponse | null> {
    return ProductSchema.findById(id)
  }


  public async getByBarCode (barCodes: string): Promise<IProductResponse| null> {
    return ProductSchema.findOne({ bar_codes: barCodes })
  }


  public async update (id:string, payload: IProduct): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndUpdate(id, payload, { returnDocument: 'after', runValidators: true })
  }

  
  public async delete (id:string): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndDelete(id)
  }
}

export default new ProductRepository()
