import 'cross-fetch/polyfill'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: `Jen`,
    email: `jen@example.com`,
    password: bcrypt.hashSync(`Red091^%8`)
  },
  user: undefined,
  jwt: undefined,
}

const userTwo = {
  input: {
    name: `Bob`,
    email: `bob@example.com`,
    password: bcrypt.hashSync(`mypassword`),
  },
  user: undefined,
  jwt: undefined,
}

const seedDatabase = async () => {
  await prisma.mutation.deleteManyUsers()

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  })

  userOne.jwt = jwt.sign({ 
    userId: userOne.user.id,
  },
    process.env.JWT_SECRET,
  )

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  })

  userTwo.jwt = jwt.sign({
    userId: userTwo.user.id,
  },
    process.env.JWT_SECRET,
  )
}

export default seedDatabase

export {
  userOne, 
  userTwo,
}