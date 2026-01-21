import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const RICK_AND_MORTY_API = "https://rickandmortyapi.com/graphql";

export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: RICK_AND_MORTY_API }),
    cache: new InMemoryCache(),
  });
}
