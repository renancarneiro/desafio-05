import { Schema, model } from 'mongoose'

import { IUser } from '../interface/IUser'

const schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }
}, { timestamps: true })

const Product = model<IUser>('User', schema)
export default Product
