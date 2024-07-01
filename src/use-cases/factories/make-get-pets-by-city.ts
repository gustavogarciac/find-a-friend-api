import { PrismaPetRepository } from 'src/repositories/prisma/prisma-pet-repository'

import { GetPetsByCityUseCase } from '../pet/get-pets-by-city'

export function makeGetPetsByCity() {
  const petRepository = new PrismaPetRepository()
  const getPetsByCityUseCase = new GetPetsByCityUseCase(petRepository)

  return getPetsByCityUseCase
}
