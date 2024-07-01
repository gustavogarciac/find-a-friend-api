import { compare } from 'bcryptjs'
import { InMemoryOrgRepository } from 'src/repositories/in-memory/in-memory-org-repository.js'
import { OrgRepository } from 'src/repositories/org-repository.js'
import { BadRequestError } from 'src/use-cases/errors/bad-request-error.js'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateOrgUseCase } from '../create-org.js'

let orgRepository: OrgRepository
let sut: CreateOrgUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  it('should create an organization', async () => {
    const { org } = await sut.execute({
      name: 'Pet Inc',
      email: 'attending@pet.com',
      city: 'Porto Alegre',
      password: '123456',
      state: 'RS',
      country: 'Brazil',
      latitude: -30.0346471,
      longitude: -51.2176584,
      phone: '555-555-5555',
      street: '123 Main St',
      website: 'https://pet.com',
      zip: '90001',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not allow to create an organization with an existing name', async () => {
    await sut.execute({
      name: 'Pet Inc',
      email: 'attending@pet.com',
      password: '123456',
      city: 'Porto Alegre',
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
        name: 'Pet Inc',
        email: 'attending@pet.com',
        password: '123456',
        city: 'Porto Alegre',
        state: 'RS',
        country: 'Brazil',
        latitude: -30.0346471,
        longitude: -51.2176584,
        phone: '555-555-5555',
        street: '123 Main St',
        website: 'https://pet.com',
        zip: '90001',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should not allow to create an organization with an existing email', async () => {
    await sut.execute({
      name: 'Pet Inc',
      email: 'attending@pet.com',
      password: '123456',
      city: 'Porto Alegre',
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
        name: 'Your Friend',
        email: 'attending@pet.com',
        password: '123456',
        city: 'Porto Alegre',
        state: 'RS',
        country: 'Brazil',
        latitude: -30.0346471,
        longitude: -51.2176584,
        phone: '555-555-5555',
        street: '123 Main St',
        website: 'https://pet.com',
        zip: '90001',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should hash an organization password during creation', async () => {
    const { org } = await sut.execute({
      name: 'Pet Inc',
      email: 'attending@pet.com',
      city: 'Porto Alegre',
      password: '123456',
      state: 'RS',
      country: 'Brazil',
      latitude: -30.0346471,
      longitude: -51.2176584,
      phone: '555-555-5555',
      street: '123 Main St',
      website: 'https://pet.com',
      zip: '90001',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.passwordHash)

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })
})
