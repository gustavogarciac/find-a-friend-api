import { PetSize, PetType, Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

import { PetRepository } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async create({
    data,
    orgId,
  }: {
    data: Prisma.PetCreateInput
    orgId: string
  }) {
    const pet = await prisma.pet.create({
      data: {
        ...data,
        organization: {
          connect: {
            id: orgId,
          },
        },
      },
    })

    return pet
  }

  async getManyByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city,
        },
      },
    })

    return pets
  }

  async getPets({
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
  }) {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        energyLevel,
        age,
        type,
        size,
      },
    })

    return pets
  }
}
