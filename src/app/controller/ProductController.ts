import { Request, Response } from 'express'
import { Readable } from 'stream'
import readline from 'readline'

import DuplicateKeyError from '../error/DuplicateKeyError'
import BadRequestError from '../error/BadRequestError'
import ProductService from '../service/ProductService'
import { IProduct, IQueryGet } from '../interface/IProduct'
import Logger from '../config/logger'

class ProductController {
  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      const result = await ProductService.create(body)

      return res.status(201).json(result)
    } catch (error) {
      if (error.code === 11000) {
        const nameError = Object.keys(error.keyValue)
        return res.status(400).json(DuplicateKeyError(nameError))
      }

      return res.status(500).json({ error })
    }
  }

  public async findAll (req: Request<{}, {}, {}, IQueryGet>, res: Response): Promise<Response> {
    try {
      const { page, limit, ...query } = req.query
      const result = await ProductService.findAll(query, page || 1, limit || 50)

      return res.status(200).json(result)
    } catch (error) {
      Logger.error(error.message)
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message
        })
      }

      return res.status(500).json({ error })
    }
  }

  public async findOne (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const result = await ProductService.getById(id)

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

  public async createWithCsv (req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file?.buffer

      if (!file) throw new BadRequestError('the file is expected to be sent')

      const readableFile = new Readable()

      readableFile.push(file)
      readableFile.push(null)

      const productsLine = readline.createInterface({

        input: readableFile

      })

      const products: IProduct[] = []

      for await (const line of productsLine) {
        const productLineSplit = line.split(',')

        products.push({

          title: productLineSplit[0],
          description: productLineSplit[1],
          department: productLineSplit[2],
          brand: productLineSplit[3],
          price: Number(productLineSplit[4]),
          qtd_stock: Number(productLineSplit[5]),
          bar_codes: productLineSplit[6]
          
        })
      }

      const result = await ProductService.createWithCsv(products)

      return res.status(201).json(result)
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message
        })
      }

      if (error.code === 11000) {
        const nameError = Object.keys(error.keyValue)
        return res.status(400).json(DuplicateKeyError(nameError))
      }

      return res.status(500).json({ error })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const body = req.body
      const resuly = await ProductService.update(id, body)

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
      const result = await ProductService.delete(id)

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

  public async findLowStock (req: Request<{}, {}, {}, IQueryGet>, res: Response): Promise<Response> {
    try {
      const { page, limit } = req.query
      const result = await ProductService.getLowStock(page || 1, limit || 50)

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
}

export default new ProductController()
