import { OrgRepository } from 'src/repositories/org-repository'
import { generateSlug } from 'src/utils/generate-slug'

interface CreateOrgUseCaseRequest {
  name: string
  latitude: number
  longitude: number
  street: string
  city: string
  state: string
  country: string
  zip: string
  phone: string
  email: string
  website: string
}

interface CreateOrgUseCaseResponse {
  orgId: string
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    latitude,
    longitude,
    street,
    city,
    state,
    country,
    zip,
    phone,
    email,
    website,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const slug = generateSlug(name)

    const slugAlreadyExists = await this.orgRepository.findBySlug(slug)

    if (slugAlreadyExists) throw new Error('Slug already exists')

    const { orgId } = await this.orgRepository.create({
      name,
      slug,
      longitude,
      latitude,
      street,
      city,
      state,
      country,
      zip,
      phone,
      email,
      website,
    })

    return { orgId }
  }
}
