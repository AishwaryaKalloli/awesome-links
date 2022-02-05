import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
import Cors from 'micro-cors'
import { createContext } from '../../graphql/context'


const cors = Cors()
const apolloServer = new ApolloServer({ 
	schema, 
	resolvers,
	context: createContext,
})
const startServer = apolloServer.start()

export default cors(async function handler(request, response) {
	if (request.method === 'OPTIONS') {
		response.end()
		return false
	}

	await startServer

	await apolloServer.createHandler({
		path: '/api/graphql'
	})(request, response)
})

export const config = {
	api: {
		bodyParser: false,
	},
}