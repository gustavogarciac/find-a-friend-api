import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create({
    data,
    orgId,
  }: {
    data: Prisma.PetCreateWithoutOrganizationInput
    orgId: string
  }): Promise<Pet>
  getManyByCity(city: string): Promise<Pet[]>
}
