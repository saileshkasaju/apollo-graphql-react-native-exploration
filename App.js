import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Navigator from "./Navigator";
import { getToken } from "./loginUtils";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjwqq6e2q5lc00181p1poaify",
  request: async operation => {
    const token = await getToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    });
  }
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
}
