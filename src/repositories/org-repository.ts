import { Prisma } from '@prisma/client'

export interface OrgRepository {
  create(
    data: Prisma.OrganizationCreateInput,
  ): Promise<{ orgId: string } | null>
}
