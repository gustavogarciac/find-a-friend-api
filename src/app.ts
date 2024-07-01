import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { orgRoutes } from './http/controllers/org/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setErrorHandler(errorHandler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Find a Friend API',
      description: 'Backend service to run the platform Find a Friend',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(orgRoutes)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
