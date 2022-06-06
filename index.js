const { ApolloServer, gql } = require('apollo-server')

// Schema
const typeDefs = gql`
  type Prediction{
    features: FeatureInfo!
    start: String!
    end: String
    reqNum: Int
    data: [Pair]!
  }
  type Pair{
    timestamp: String!
    value: Float!
  }
  type FeatureInfo{
      db: String!
      table: String!
      feature: [String!]!
  }
  type Query {
      getPredictions: [Prediction]
  }
`;