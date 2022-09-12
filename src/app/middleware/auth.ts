import { Request, Response, NextFunction } from 'express'
import jtw from 'jsonwebtoken'

import UnauthorizedError from '../error/UnauthorizedError'
import authConfig from '../config/auth.json'
// 401
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) throw new UnauthorizedError('No token provided')

    const parts = authHeader.split(' ')

    if (!(parts.length === 2)) throw new UnauthorizedError('Token error')

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) throw new UnauthorizedError('Token malformatted')

    jtw.verify(token, authConfig.secret, (err, decoded) => {
      if (err) throw new UnauthorizedError('Token Invalid')

      return next()
    })
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        message: error.name,
        details: error.message
      })
    }

    return res.status(500).json({ error })
  }
}
