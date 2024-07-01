import { Pet } from '@prisma/client'
import { PetRepository } from 'src/repositories/pet-repository'

interface GetPetsByCityUseCaseRequest {
  city: string
}

interface GetPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class GetPetsByCityUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
  }: GetPetsByCityUseCaseRequest): Promise<GetPetsByCityUseCaseResponse> {
    const pets = await this.petRepository.getManyByCity(city)

    return { pets }
  }
}
