const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const {PrismaClient} = require('@prisma/client')

const typeDefs = require('./src/graphql/typeDefs')
const resolvers = require('./src/graphql/resolvers')

const prisma = new PrismaClient()

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    const {url} = await startStandaloneServer(server, {
        listen: {port: 4000},
        context: async () => ({prisma})
    })

    console.log(`Servidor listo en ${url}`)
    console.log(`Sandbox de Apollo abierto en ${url}`)
}

startServer().catch(err => {
    console.error("Error al iniciar el servidor: ", err)
})