import { gql } from 'apollo-boost'

export const createUser = gql`
    mutation($data:CreateUserInput!) {
      createUser(
        data: $data
      ) {
        token,
        user {
          id
          name
          email
        }
      }
    }
  `

export const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `

export const login = gql`
    mutation($data:LoginUserInput!) {
      login(
        data: $data
      ) {
        token,
        user {
          name
          email
        }
      }
    }
  `
export const getProfile = gql`
    query {
      me {
        id
        name
        email
      }
    }
  `