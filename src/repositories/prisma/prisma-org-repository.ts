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

    return { orgId: org.id }
  }
}
