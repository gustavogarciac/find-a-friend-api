import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { generateSlug } from 'src/utils/generate-slug'

import { OrgRepository } from '../org-repository'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const org = await prisma.organization.create({
      data: {
        ...data,
        slug: generateSlug(data.name),
      },
    })

    return org
  }

  async findBySlug(slug: string) {
    const org = await prisma.organization.findUnique({
      where: {
        slug,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findById(orgId: string) {
    const org = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    })

    return org
  }
}
