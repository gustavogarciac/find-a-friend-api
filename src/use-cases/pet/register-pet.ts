import { Pet, PetSize, PetType } from '@prisma/client'
import { OrgRepository } from 'src/repositories/org-repository'
import { PetRepository } from 'src/repositories/pet-repository'

import { BadRequestError } from '../errors/bad-request-error'

interface RegisterPetUseCaseRequest {
  name: string
  bio: string
  energyLevel: number
  age: number
  type: PetType
  size: PetSize
  imageUrl: string
  requirements: string
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    age,
    bio,
    energyLevel,
    imageUrl,
    name,
    orgId,
    requirements,
    size,
    type,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) throw new BadRequestError('Organization not found')

    const pet = await this.petRepository.create({
      data: {
        age,
        bio,
        energyLevel,
        imageUrl,
        name,
        requirements,
        size,
        type,
      },
      orgId,
    })

    return { pet }
  }
}
