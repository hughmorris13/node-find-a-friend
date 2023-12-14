export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found.')
    console.error('Resource not found.')
  }
}
