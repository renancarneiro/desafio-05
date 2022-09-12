import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      department: Joi.string().optional().trim(),
      brand: Joi.string().optional().trim(),
      limit: Joi.number().optional().integer().positive(),
      page: Joi.number().optional().integer().positive(),
      title: Joi.string().forbidden(),
      description: Joi.string().forbidden(),
      bar_codes: Joi.string().forbidden(),
      price: Joi.number().forbidden(),
      qtd_stock: Joi.number().forbidden(),
      stock_control_enabled: Joi.boolean().forbidden()
    })

    const { error } = await schema.validateAsync({
      limit: Number(req.query.limit) || undefined,
      page: Number(req.query.page) || undefined,
      ...req.query
    }, { abortEarly: false })
    if (error) throw error

    return next()
  } catch (error) {
    return res.status(400).json({
      message: error.name,
      details: error.details
    })
  }
}
