import { IUser, IUserResponse } from '../interface/IUser'
import UserSchema from '../schema/UserSchema'

class UserRepository {
  public async create (payload: IUser): Promise<IUserResponse> {
    return UserSchema.create(payload)
  }

  public async get (): Promise<any> {
    return UserSchema.find()
  }

  public async getByEmail (email: string): Promise<IUserResponse | null> {
    return UserSchema.findOne({ email }).select('+password')
  }

  public async update (id:string, payload: IUser): Promise<IUserResponse | null> {
    return UserSchema.findByIdAndUpdate(id, payload, { returnDocument: 'after', runValidators: true })
  }

  public async delete (id:string): Promise<IUserResponse | null> {
    return UserSchema.findByIdAndDelete(id)
  }
}

export default new UserRepository()
