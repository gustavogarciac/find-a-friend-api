import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeCreateOrgUseCase } from 'src/use-cases/factories/make-create-org'
import z from 'zod'

export async function createOrg(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/orgs',
    {
      schema: {
        summary: 'Create a new organization',
        tags: ['organizations'],
        body: z.object({
          name: z.string(),
          password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
          latitude: z.number(),
          longitude: z.number(),
          street: z.string(),
          city: z.string(),
          state: z.string(),
          country: z.string(),
          zip: z.string(),
          phone: z.string(),
          email: z.string().email(),
          website: z.string().url(),
        }),
        response: {
          201: z.object({
            orgId: z.string().uuid(),
          }),
        },
      },
    },
    async (req, reply) => {
      const {
        name,
        password,
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
      } = req.body

      const createOrgUseCase = makeCreateOrgUseCase()

      const { org } = await createOrgUseCase.execute({
        name,
        password,
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
      })

      return reply.status(201).send({ orgId: org.id })
    },
  )
}
