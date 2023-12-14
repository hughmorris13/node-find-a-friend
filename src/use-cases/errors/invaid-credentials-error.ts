export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials.')
    console.error('Invalid credentials.')
  }
}
