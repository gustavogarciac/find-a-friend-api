import { InMemoryOrgRepository } from 'src/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from 'src/repositories/in-memory/in-memory-pet-repository'
import { OrgRepository } from 'src/repositories/org-repository'
import { PetRepository } from 'src/repositories/pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { GetPetDetailsUseCase } from '../get-pet-details'

let petRepository: PetRepository
let orgRepository: OrgRepository
let sut: GetPetDetailsUseCase

describe('Get Pets Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository()
    sut = new GetPetDetailsUseCase(petRepository)
  })

  it('should get all pets', async () => {
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

    const pet = await petRepository.create({
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

    const { pet: petDetails } = await sut.execute(pet.id)

    expect(petDetails.name).toEqual('Rubya')
    expect(petDetails.age).toEqual(3)
    expect(petDetails.type).toEqual('FISH')
    expect(petDetails.id).toEqual(expect.any(String))
  })
})
