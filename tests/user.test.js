import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import getClient from './utils/getClient'
import seedDatabase, { userOne } from './utils/seedDatabase'
import { createUser, getUsers, login, getProfile } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test(`Should create a new user`, async () => {
  const variables = {
    data: {
      name: `Carynn`,
      email: `carynn@example.com`,
      password: `mypassword`
    }
  }

  const response = await client.mutate({
    mutation: createUser,
    variables,
  })

  const user = await prisma.exists.User({
    id: response.data.createUser.user.id
  })

  expect(user).toBe(true)
})

test(`Should expose public author profile`, async () => {
  const response = await client.query({ query: getUsers })
  
  expect(response.data.users.length).toBe(2)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe(`Jen`)
})

test(`Should not login with bad credentials`, async () => {
  const variables = {
    data: {
      email: `adam@adam.com`,
      password: `12345678`,
    }
  }
 
  await expect(client.mutate({
    mutation: login,
    variables
  })).rejects.toThrow()
})

test(`Should not signup with short password`, async () => {
  const variables = {
    data: {
      name: `Chase`,
      email: `chase@example.com`,
      password: `123`,
    }
  }

  await expect(client.mutate({
    mutation: createUser,
    variables,
  })).rejects.toThrow()
})

test(`Should fetch user profile`, async () => {
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: getProfile})

  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)
})