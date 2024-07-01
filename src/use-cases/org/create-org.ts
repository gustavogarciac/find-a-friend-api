import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgRepository } from 'src/repositories/org-repository.js'
import { generateSlug } from 'src/utils/generate-slug.js'

import { BadRequestError } from '../errors/bad-request-error.js'

interface CreateOrgUseCaseRequest {
  name: string
  password: string
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
  org: Organization
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    latitude,
    longitude,
    password,
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

    if (slugAlreadyExists) throw new BadRequestError('Slug already exists')

    const emailAlreadyInUse = await this.orgRepository.findByEmail(email)

    if (emailAlreadyInUse) throw new BadRequestError('Email already in use')

    const passwordHash = await hash(password, 8)

    const org = await this.orgRepository.create({
      name,
      slug,
      passwordHash,
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

    return { org }
  }
}
