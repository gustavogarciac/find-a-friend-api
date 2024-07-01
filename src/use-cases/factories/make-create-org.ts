import { PrismaOrgRepository } from 'src/repositories/prisma/prisma-org-repository'

import { CreateOrgUseCase } from '../org/create-org'

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const createOrgUseCase = new CreateOrgUseCase(orgRepository)

  return createOrgUseCase
}
