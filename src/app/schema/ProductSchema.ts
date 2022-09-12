import { Schema, model, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { IProduct } from '../interface/IProduct'

const schema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  bar_codes: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  qtd_stock: { type: Number, required: true },
  stock_control_enabled: { type: Boolean, default: true }
}, { timestamps: true })

schema.plugin(paginate)

const Product = model<IProduct, PaginateModel<IProduct>>('Product', schema)
export default Product
