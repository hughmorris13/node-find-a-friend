import { OngsRepository } from '@/repositories/ongs-repository'

export class GetOngUseCase {
  constructor(private readonly ongRepo: OngsRepository) {}

  async execute(id: string) {
    const ong = await this.ongRepo.findById(id)
    return {
      ong,
    }
  }
}
