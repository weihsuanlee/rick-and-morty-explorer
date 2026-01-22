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
  // Keep a single Apollo client instance for the lifetime of the app so URL changes
  // (like selecting a character) don't recreate the client and refetch list data.
  const clientRef = React.useRef(createApolloClient(initialState));

  return <ApolloProvider client={clientRef.current}>{children}</ApolloProvider>;
}
