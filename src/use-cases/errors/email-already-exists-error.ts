export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
    console.error('E-mail already exists.')
  }
}
