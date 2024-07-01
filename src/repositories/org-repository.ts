import { Organization, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findBySlug(slug: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  findById(orgId: string): Promise<Organization | null>
}
