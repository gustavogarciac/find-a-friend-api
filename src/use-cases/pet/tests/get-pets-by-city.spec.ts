import { InMemoryOrgRepository } from 'src/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from 'src/repositories/in-memory/in-memory-pet-repository'
import { OrgRepository } from 'src/repositories/org-repository'
import { PetRepository } from 'src/repositories/pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { GetPetsByCityUseCase } from '../get-pets-by-city'

let petRepository: PetRepository
let orgRepository: OrgRepository
let sut: GetPetsByCityUseCase

describe('Get Pets Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository()
    sut = new GetPetsByCityUseCase(petRepository)
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

    const secondaryOrg = await orgRepository.create({
      name: 'Acme Domain',
      slug: 'acme-domain',
      email: 'acme@domain.com',
      passwordHash: '123456',
      city: 'Belo Horizonte',
      state: 'MG',
      country: 'Brazil',
      latitude: -30.0346471,
      longitude: -51.2176584,
      phone: '555-555-5555',
      street: '123 Main St',
      website: 'https://acme.com',
      zip: '9004',
    })

    await petRepository.create({
      data: {
        name: 'Muddy',
        age: 2,
        address: `${secondaryOrg.street}, ${secondaryOrg.city}, ${secondaryOrg.state}, ${secondaryOrg.zip}`,
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

    const { pets } = await sut.execute({ city: 'Porto Alegre' })

    expect(pets).toHaveLength(2)
  })
})
