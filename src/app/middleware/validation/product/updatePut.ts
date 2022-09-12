import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required().trim(),
      description: Joi.string().required().trim(),
      department: Joi.string().required().trim(),
      brand: Joi.string().required().trim(),
      price: Joi.number().required().min(0.01).max(1000),
      qtd_stock: Joi.number().required().min(0).max(100000).integer(),
      bar_codes: Joi.string().forbidden(),
      stock_control_enabled: Joi.boolean().forbidden(),
      createdAt: Joi.string().forbidden(),
      updatedAt: Joi.string().forbidden(),
      _id: Joi.string().forbidden()
    })

    const { error } = await schema.validateAsync(req.body, { abortEarly: false })
    if (error) throw error

    return next()
  } catch (error) {
    return res.status(400).json({
      message: error.name,
      details: error.details
    })
  }
}
