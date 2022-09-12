import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import morgan, { StreamOptions } from 'morgan'

import routes from './routes/index.router'
import './infra/database/mongo/index'
import swaggerDocs from './swagger.json'
import Logger from './app/config/logger'

const stream: StreamOptions = {
  write: (message) => Logger.http(message)
}

class App {
  public server: express.Application

  public constructor () {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  public init (): express.Application {
    return this.server
  }

  private middlewares (): void {
    this.server.use(express.json())
    this.server.use(
      express.urlencoded({
        extended: true
      })
    )
    this.server.use(cors())
    this.server.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
    this.server.use(morgan(
      ':method :url - status: :status - :response-time ms',
      { stream }
    ))
  }

  private routes (): void {
    this.server.use(...routes)
  }
}

export default new App().init()
