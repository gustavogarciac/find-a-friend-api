import { PrismaOrgRepository } from 'src/repositories/prisma/prisma-org-repository'

import { AuthenticateWithPasswordUseCase } from '../sessions/authenticate-with-password-use-case'

export function makeAuthenticateWithPassword() {
  const orgRepository = new PrismaOrgRepository()
  const authenticateWithPasswordUseCase = new AuthenticateWithPasswordUseCase(
    orgRepository,
  )

  return authenticateWithPasswordUseCase
}
