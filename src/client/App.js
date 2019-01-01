import React, { Component } from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const query = gql`
  query temp {
    temp {
      current
    }
  }
`;

const client = new ApolloClient();

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={query}>
          {({ data }) => (
            <div style={{ textAlign: "center" }}>
              {console.log(data.temp)}
              <h1>Weather client: {data.temp && data.temp.current}</h1>
            </div>
          )}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
