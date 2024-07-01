import { Pet, PetSize, PetType } from '@prisma/client'
import { PetRepository } from 'src/repositories/pet-repository'

interface GetPetsUseCaseRequest {
  name?: string
  energyLevel?: number
  age?: number
  type?: PetType
  size?: PetSize
}

interface GetPetsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    age,
    energyLevel,
    name,
    size,
    type,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const pets = await this.petRepository.getPets({
      age,
      energyLevel,
      name,
      size,
      type,
    })

    return { pets }
  }
}
