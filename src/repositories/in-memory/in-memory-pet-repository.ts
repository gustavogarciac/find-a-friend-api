import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private items: Pet[] = []

  async create({
    data,
    orgId,
  }: {
    data: Prisma.PetCreateInput
    orgId: string
  }) {
    const item: Pet = {
      name: data.name,
      age: data.age,
      type: data.type,
      bio: data.bio,
      energyLevel: data.energyLevel,
      id: randomUUID(),
      imageUrl: data.imageUrl,
      organizationId: orgId,
      requirements: data.requirements,
      size: data.size,
    }

    this.items.push(item)

    return item
  }
}
