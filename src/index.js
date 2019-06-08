import '@babel/polyfill/noConflict'
import server from './server'

const PORT = process.env.PORT || 4000
server.start({ port: PORT }, () => {
  console.log(`The server is up on port ${PORT}`)
})

