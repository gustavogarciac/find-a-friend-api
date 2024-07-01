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
      address: data.address,
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

  async getManyByCity(city: string) {
    const items = this.items.filter((item) => item.address.includes(city))

    return items
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
    type?: string
    size?: string
  }) {
    const items = this.items.filter((item) => {
      if (name && !item.name.includes(name)) {
        return false
      }

      if (energyLevel && item.energyLevel !== energyLevel) {
        return false
      }

      if (age && item.age !== age) {
        return false
      }

      if (type && item.type !== type) {
        return false
      }

      if (size && item.size !== size) {
        return false
      }

      return true
    })

    return items
  }
}
