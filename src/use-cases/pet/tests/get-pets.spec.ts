import { InMemoryOrgRepository } from 'src/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from 'src/repositories/in-memory/in-memory-pet-repository'
import { OrgRepository } from 'src/repositories/org-repository'
import { PetRepository } from 'src/repositories/pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { GetPetsUseCase } from '../get-pets'

let petRepository: PetRepository
let orgRepository: OrgRepository
let sut: GetPetsUseCase

describe('Get Pets Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository()
    sut = new GetPetsUseCase(petRepository)

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

    await petRepository.create({
      data: {
        name: 'Buddy',
        age: 2,
        address: `${org.street}, ${org.city}, ${org.state}, ${org.zip}`,
        type: 'DOG',
        bio: 'A very good boy',
        energyLevel: 5,
        imageUrl: 'https://pet.com/buddy.jpg',
        requirements: 'Needs a lot of attention',
        size: 'MEDIUM',
      },
      orgId: org.id,
    })

    await petRepository.create({
      data: {
        name: 'Rubya',
        age: 5,
        address: `${org.street}, ${org.city}, ${org.state}, ${org.zip}`,
        type: 'CAT',
        bio: 'A very good girl',
        energyLevel: 5,
        imageUrl: 'https://pet.com/buddy.jpg',
        requirements: 'Needs a lot of attention',
        size: 'SMALL',
      },
      orgId: org.id,
    })

    await petRepository.create({
      data: {
        name: 'Rubya',
        age: 3,
        address: `${org.street}, ${org.city}, ${org.state}, ${org.zip}`,
        type: 'FISH',
        bio: 'A very good fish',
        energyLevel: 1,
        imageUrl: 'https://pet.com/buddy.jpg',
        requirements: 'Needs a lot of careful attention',
        size: 'LARGE',
      },
      orgId: org.id,
    })

    await petRepository.create({
      data: {
        name: 'Lemon',
        age: 7,
        address: `${org.street}, ${org.city}, ${org.state}, ${org.zip}`,
        type: 'DOG',
        bio: 'A senior dog that wants a lot of love.',
        energyLevel: 1,
        imageUrl: 'https://pet.com/lemon.jpg',
        requirements: 'Needs a lot of careful attention',
        size: 'LARGE',
      },
      orgId: org.id,
    })
  })

  it('should get all pets', async () => {
    const { pets } = await sut.execute({})

    expect(pets).toHaveLength(4)
  })

  it('should get pets filtered by name', async () => {
    const { pets } = await sut.execute({ name: 'Rubya' })

    expect(pets).toHaveLength(2)
  })

  it('should get pets filtered by age', async () => {
    const { pets } = await sut.execute({ age: 5 })

    expect(pets).toHaveLength(1)
  })

  it('should get pets filtered by type', async () => {
    const { pets } = await sut.execute({ type: 'DOG' })

    expect(pets).toHaveLength(2)
  })

  it('should get pets filtered by size', async () => {
    const { pets } = await sut.execute({ size: 'LARGE' })

    expect(pets).toHaveLength(2)
  })

  it('should get pets filtered by energy level', async () => {
    const { pets } = await sut.execute({ energyLevel: 5 })

    expect(pets).toHaveLength(2)
  })
})
