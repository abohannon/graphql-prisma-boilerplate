import getUserId from '../utils/getUserId'
import { Prisma } from 'prisma-binding';

const userIdFragment = `fragment userId on User { id }`

// Individual field resolvers run AFTER the parent resolver runs. E.g. Query.users in Query.js.
const User = {
  email: {
    fragment: userIdFragment,
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false)

      if (userId && userId === parent.id) {
        return parent.email
      } else {
        return null
      }
    }
  },
}

export { User as default }