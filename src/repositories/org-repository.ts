import { Organization, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<{ orgId: string }>
  findBySlug(slug: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}
