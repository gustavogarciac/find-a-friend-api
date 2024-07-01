import { hash } from 'bcryptjs'
import { InMemoryOrgRepository } from 'src/repositories/in-memory/in-memory-org-repository.js'
import { OrgRepository } from 'src/repositories/org-repository.js'
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials-error'
import { AuthenticateWithPasswordUseCase } from 'src/use-cases/sessions/authenticate-with-password-use-case.js'
import { beforeEach, describe, expect, it } from 'vitest'

let orgRepository: OrgRepository
let sut: AuthenticateWithPasswordUseCase

describe('Authenticate with Password Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new AuthenticateWithPasswordUseCase(orgRepository)
  })

  it('should authenticate with password', async () => {
    await orgRepository.create({
      name: 'Pet Inc',
      email: 'attending@pet.com',
      slug: 'pet-inc',
      city: 'Porto Alegre',
      passwordHash: await hash('123456', 8),
      state: 'RS',
      country: 'Brazil',
      latitude: -30.0346471,
      longitude: -51.2176584,
      phone: '555-555-5555',
      street: '123 Main St',
      website: 'https://pet.com',
      zip: '90001',
    })

    const { org } = await sut.execute({
      email: 'attending@pet.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not authenticate with wrong password', async () => {
    await orgRepository.create({
      name: 'Pet Inc',
      email: 'attending@pet.com',
      slug: 'pet-inc',
      city: 'Porto Alegre',
      passwordHash: await hash('123456', 8),
      state: 'RS',
      country: 'Brazil',
      latitude: -30.0346471,
      longitude: -51.2176584,
      phone: '555-555-5555',
      street: '123 Main St',
      website: 'https://pet.com',
      zip: '90001',
    })

    await expect(() =>
      sut.execute({
        email: 'attending@pet.com',
        password: 'wrongpass',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate with invalid email', async () => {
    await orgRepository.create({
      name: 'Pet Inc',
      email: 'attending@pet.com',
      slug: 'pet-inc',
      city: 'Porto Alegre',
      passwordHash: await hash('123456', 8),
      state: 'RS',
      country: 'Brazil',
      latitude: -30.0346471,
      longitude: -51.2176584,
      phone: '555-555-5555',
      street: '123 Main St',
      website: 'https://pet.com',
      zip: '90001',
    })

    await expect(() =>
      sut.execute({
        email: 'wrong-email@pet.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
