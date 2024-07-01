import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from './use-cases/errors/bad-request-error'
import { InvalidCredentialsError } from './use-cases/errors/invalid-credentials-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = async (
  error,
  request,
  reply,
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Internal Server Error' })
}
