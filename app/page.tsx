import type { Metadata } from "next";

import { ExplorerPage } from "@/components/explorer/ExplorerPage";
import { siteConfig } from "@/config/site";
import { ApolloClientProvider } from "@/lib/apollo/ApolloClientProvider";
import { createApolloClient } from "@/lib/apollo/client";
import { CHARACTERS_QUERY, type CharactersQuery, type CharactersQueryVariables } from "@/lib/graphql/characters";
import type { NormalizedCacheObject } from "@apollo/client";

export const metadata: Metadata = {
  title: "Rick & Morty Explorer",
  description: siteConfig.description,
  openGraph: {
    title: "Rick & Morty Explorer",
    description: siteConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rick & Morty Explorer",
    description: siteConfig.description,
  },
};

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};
export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = (await searchParams) ?? {};
  const pageParam = typeof resolvedParams.page === "string" ? resolvedParams.page : "1";
  const queryParam = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const idParam = typeof resolvedParams.id === "string" ? resolvedParams.id : "";
  const page = Number(pageParam) || 1;
  const q = queryParam.trim();
  const shouldSsr = page === 1 && q.length === 0 && idParam.length === 0;

  let initialState: NormalizedCacheObject | null = null;

  if (shouldSsr) {
    const client = createApolloClient();
    await client.query<CharactersQuery, CharactersQueryVariables>({
      query: CHARACTERS_QUERY,
      variables: { page, name: q.length > 0 ? q : undefined },
    });
    initialState = client.cache.extract() as NormalizedCacheObject;
  }

  return (
    <ApolloClientProvider initialState={initialState}>
      <ExplorerPage />
    </ApolloClientProvider>
  );
}
