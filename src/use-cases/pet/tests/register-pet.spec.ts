import { InMemoryOrgRepository } from 'src/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from 'src/repositories/in-memory/in-memory-pet-repository'
import { OrgRepository } from 'src/repositories/org-repository'
import { PetRepository } from 'src/repositories/pet-repository'
import { BadRequestError } from 'src/use-cases/errors/bad-request-error'
import { beforeEach, describe, expect, it } from 'vitest'

import { RegisterPetUseCase } from '../register-pet'

let orgRepository: OrgRepository
let petRepository: PetRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository()
    sut = new RegisterPetUseCase(petRepository, orgRepository)
  })

  it('should register a pet', async () => {
    const org = await orgRepository.create({
      name: 'Pet Inc',
      slug: 'pet-inc',
      email: 'attending@pet.com',
      passwordHash: '123456',
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

    const { pet } = await sut.execute({
      age: 1,
      bio: 'bio',
      energyLevel: 1,
      imageUrl: 'imageUrl',
      name: 'Bob',
      orgId: org.id,
      requirements: 'requirements',
      size: 'LARGE',
      type: 'DOG',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Bob')
    expect(pet.age).toEqual(1)
  })

  it('should not register a pet within nonexisting organization', async () => {
    await expect(() =>
      sut.execute({
        age: 1,
        bio: 'bio',
        energyLevel: 1,
        imageUrl: 'imageUrl',
        name: 'Bob',
        orgId: 'non-existing-id',
        requirements: 'requirements',
        size: 'LARGE',
        type: 'DOG',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
