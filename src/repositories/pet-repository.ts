import { Pet, PetSize, PetType, Prisma } from '@prisma/client'

export interface PetRepository {
  create({
    data,
    orgId,
  }: {
    data: Prisma.PetCreateWithoutOrganizationInput
    orgId: string
  }): Promise<Pet>
  getManyByCity(city: string): Promise<Pet[]>
  getPets({
    name,
    energyLevel,
    age,
    type,
    size,
  }: {
    name?: string
    energyLevel?: number
    age?: number
    type?: PetType
    size?: PetSize
  }): Promise<Pet[]>
}
