process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// Schema

const server = new ApolloServer({ 
  typeDefs,
  resolvers
 });

server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`);
});
const Predictions = [
    {
        features: {
            db: "AMPds2",
            table: "electricity",
            feature: "V"
        },
        start: ""
    }
]