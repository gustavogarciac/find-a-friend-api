import { PrismaOrgRepository } from 'src/repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from 'src/repositories/prisma/prisma-pet-repository'

import { RegisterPetUseCase } from '../pet/register-pet'

export function makeRegisterPet() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    petRepository,
    orgRepository,
  )

  return registerPetUseCase
}
