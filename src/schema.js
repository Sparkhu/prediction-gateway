const { gql } = require('apollo-server')
const { GraphQLDateTime } = require('graphql-custom-types')


const typeDefs = gql`
  
  scalar GraphQLDateTime

  enum DBScheme {
    INFLUX
    ONTHEFLY
    MYSQL
  }
  interface ConnectionInfo{
    scheme: DBScheme!
    host: String!
    port: String!
  }
  """
  Todo: encryption
  """
  type InfluxConn implements ConnectionInfo{
      scheme: DBScheme!
      host: String!
      port: String!
      user: String!
      passwd: String!
  }
  type DB{
    name: ID!
    conn: ConnectionInfo
    tables: [Table]!    
  }
  type Table{
    name: String!
    features: [Feature]!
    db: DB!
  }
  type Feature{
    name: String!
    table: Table!
  }
  type Prediction{
      timestamps: [GraphQLDateTime]!
      values: [Float]!
  }
  type FeaturePrediction{
      """
      If no fetched predictions exists, start will be null
      """
      start: GraphQLDateTime
      """
      If no fetched predictions exists, end will be null
      """
      end: GraphQLDateTime
      length: Int!
      feature: Feature!
      prediction: Prediction!
  }
  input PredictionInput{
      dbName: String!
      tableName: String!
      featureName: String!
      start: GraphQLDateTime!
      end: GraphQLDateTime
      reqNum: Int
  }
  type Query{
      featurePrediction(input: PredictionInput!): FeaturePrediction!
  }
`;

module.exports = typeDefs;