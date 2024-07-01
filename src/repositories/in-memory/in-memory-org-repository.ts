import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { generateSlug } from 'src/utils/generate-slug'

import { OrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgRepository {
  private items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const id = randomUUID().toString()

    const slug = generateSlug(data.name)

    const item = {
      id,
      name: data.name,
      slug,
      latitude: data.latitude,
      longitude: data.longitude,
      street: data.street,
      city: data.city,
      state: data.state,
      country: data.country,
      zip: data.zip,
      phone: data.phone,
      email: data.email,
      website: data.website,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(item)

    return { orgId: id }
  }

  async findBySlug(slug: string) {
    const item = this.items.find((item) => item.slug === slug)

    if (!item) return null

    return item
  }

  async findByEmail(email: string) {
    const item = this.items.find((item) => item.email === email)

    if (!item) return null

    return item
  }
}
