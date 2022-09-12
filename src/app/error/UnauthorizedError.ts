export default class UnauthorizedError extends Error {
  public readonly statusCode: number

  constructor (message: string) {
    super(message)
    this.name = 'Unauthorized'
    this.statusCode = 401
  }
}
