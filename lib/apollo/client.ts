import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from "@apollo/client";

const RICK_AND_MORTY_API = "https://rickandmortyapi.com/graphql";

export function createApolloClient(
  initialState?: NormalizedCacheObject | null,
) {
  const cache = new InMemoryCache();

  if (initialState) {
    cache.restore(initialState);
  }

  return new ApolloClient({
    link: new HttpLink({ uri: RICK_AND_MORTY_API }),
    cache,
    ssrMode: typeof window === "undefined",
  });
}
