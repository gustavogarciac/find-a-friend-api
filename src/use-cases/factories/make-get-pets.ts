import { PrismaPetRepository } from 'src/repositories/prisma/prisma-pet-repository'

import { GetPetsUseCase } from '../pet/get-pets'

export function makeGetPets() {
  const petRepository = new PrismaPetRepository()
  const getPetsUseCase = new GetPetsUseCase(petRepository)

  return getPetsUseCase
}
