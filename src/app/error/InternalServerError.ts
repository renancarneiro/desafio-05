export default class InternalServerError extends Error {
  public readonly statusCode: number

  constructor (message: string) {
    super(message)
    this.name = 'Internal Server'
    this.statusCode = 500
  }
}
