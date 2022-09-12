import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import { IUser, IUserResponse, IUserResponseAuth } from '../interface/IUser'
import UserRepository from '../repository/UserRepository'
import BadRequestError from '../error/BadRequestError'
import NotFoundError from '../error/NotFoundError'
import authConfig from '../config/auth.json'

class UserService {
  public async create (payload: IUser): Promise<IUserResponse> {
    const hash = await bcrypt.hash(payload.password, 10)
    payload.password = hash

    const result = await UserRepository.create(payload)

    return result
  }

  public async findAll (): Promise<IUserResponse> {
    const result = await UserRepository.get()

    return result
  }

  public async update (id: string, payload: IUser): Promise<IUserResponse> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await UserRepository.update(id, payload)

    if (!result) throw new NotFoundError('Not found User')

    return result
  }

  public async delete (id: string): Promise<IUserResponse> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await UserRepository.delete(id)

    if (!result) throw new NotFoundError('Not found User')

    return result
  }

  public async auth (payload: IUser): Promise<IUserResponseAuth> {
    const user = await UserRepository.getByEmail(payload.email)
    if (!user) throw new NotFoundError('Not found User')

    if (!user.password) throw new NotFoundError('Not found password')

    if (!await bcrypt.compare(payload.password, user.password)) throw new BadRequestError('Invalid password')

    user.password = undefined

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: 86400
    })
    const result = { token, user }

    return result
  }
}

export default new UserService()
