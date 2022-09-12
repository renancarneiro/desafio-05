import { Request, Response } from 'express'

import UserService from '../service/UserService'

class UserController {
  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      const result = await UserService.create(body)

      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  public async findAll (req: Request, res: Response): Promise<Response> {
    try {
      const result = await UserService.findAll()

      return res.status(200).json(result)
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

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const body = req.body
      const resuly = await UserService.update(id, body)

      return res.status(200).json(resuly)
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

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const result = await UserService.delete(id)

      return res.status(204).json(result)
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

  public async auth (req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      const result = await UserService.auth(body)

      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new UserController()
