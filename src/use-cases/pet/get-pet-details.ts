import { Pet } from '@prisma/client'
import { PetRepository } from 'src/repositories/pet-repository'

import { BadRequestError } from '../errors/bad-request-error'

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(petId: string): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petRepository.getPetById(petId)

    if (!pet) throw new BadRequestError('Pet not found')

    return {
      pet,
    }
  }
}
