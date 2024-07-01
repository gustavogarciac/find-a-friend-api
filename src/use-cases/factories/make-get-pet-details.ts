import { PrismaPetRepository } from 'src/repositories/prisma/prisma-pet-repository'

import { GetPetDetailsUseCase } from '../pet/get-pet-details'

export function makeGetPetDetails() {
  const petRepository = new PrismaPetRepository()
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petRepository)

  return getPetDetailsUseCase
}
