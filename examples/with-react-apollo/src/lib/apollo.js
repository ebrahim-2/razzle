import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";

export function createClient() {
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    ssrForceFetchDelay: 100,
    link: createHttpLink({
      uri: "https://metaphysics-production.artsy.net/",
      fetch
    }),
    defaultOptions: {
      query: {
        fetchPolicy: "cache-and-network"
      }
    },
    cache: process.browser
      ? new InMemoryCache().restore(window.__APOLLO_STATE__)
      : new InMemoryCache()
  });

  return client;
}
