import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

console.log(`prisma url:`, process.env.PRISMA_ENDPOINT)

const prisma = new Prisma({
  typeDefs: `src/generated/prisma.graphql`,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
})

export { prisma as default }
