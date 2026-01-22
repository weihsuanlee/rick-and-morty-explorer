"use client";

import * as React from "react";
import { ApolloProvider } from "@apollo/client/react";
import type { NormalizedCacheObject } from "@apollo/client";

import { createApolloClient } from "@/lib/apollo/client";

type ApolloClientProviderProps = {
  children: React.ReactNode;
  initialState?: NormalizedCacheObject | null;
};

export function ApolloClientProvider({
  children,
  initialState,
}: ApolloClientProviderProps) {
  const client = React.useMemo(
    () => createApolloClient(initialState),
    [initialState],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
