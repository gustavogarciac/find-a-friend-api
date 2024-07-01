import { compare } from 'bcryptjs'
import { OrgRepository } from 'src/repositories/org-repository'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateWithPasswordUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateWithPasswordUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ email, password }: AuthenticateWithPasswordUseCaseRequest) {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) throw new InvalidCredentialsError()

    const doesPasswordMatch = await compare(password, org.passwordHash)

    if (!doesPasswordMatch) throw new InvalidCredentialsError()

    return {
      org,
    }
  }
}
