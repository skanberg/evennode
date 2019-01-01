const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const temp = require("./temp");

const server = express();

const typeDefs = gql`
  type Temp {
    current: Float
  }

  type Query {
    temp: Temp
  }
`;

const resolvers = {
  Query: {
    temp: () => temp()
  }
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      "editor.theme": "light"
    }
  },
  introspection: true
});

apollo.applyMiddleware({ app: server });

server.use(express.static("public"));
server.get("/api", (req, res) => res.json({ result: true }));

server.listen(process.env.PORT || 4000, () => console.log(`Server started`));
