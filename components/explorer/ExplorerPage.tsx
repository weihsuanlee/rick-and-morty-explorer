"use client";

import * as React from "react";
import { useQuery } from "@apollo/client/react";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Alert } from "@heroui/alert";

import { CharacterDrawer } from "@/components/explorer/CharacterDrawer";
import { CharacterSkeleton } from "@/components/explorer/CharacterSkeleton";
import { CharacterTable } from "@/components/explorer/CharacterTable";
import { PaginationControls } from "@/components/explorer/PaginationControls";
import { SearchBar } from "@/components/explorer/SearchBar";
import { CHARACTERS_QUERY, type CharactersQuery, type CharactersQueryVariables } from "@/lib/graphql/characters";
import { useCharactersUrlState } from "@/lib/hooks/useCharactersUrlState";

export function ExplorerPage() {
  const { inputValue, setInputValue, q, page, selectedId, goToPage, setSelectedId } = useCharactersUrlState();

  const { data, loading, error } = useQuery<CharactersQuery, CharactersQueryVariables>(CHARACTERS_QUERY, {
    variables: {
      page,
      name: q.length > 0 ? q : undefined,
    },
    notifyOnNetworkStatusChange: true,
  });

  const characters = data?.characters?.results ?? [];
  const selectedCharacter =
    selectedId && characters.length > 0 ? (characters.find((character) => character.id === selectedId) ?? null) : null;
  const info = data?.characters?.info ?? null;
  const errorMessage = error?.message ?? "";
  const isNotFound = errorMessage.toLowerCase().includes("404");
  const hasResults = characters.length > 0;
  const showEmpty = !loading && !hasResults && (isNotFound || !error);
  const totalCount = info?.count ?? 0;
  const totalPages = info?.pages ?? 1;
  const resultsCount = characters.length;

  return (
    <div className="relative overflow-hidden sm:rounded-[28px] bg-content2/70 px-4 py-6 shadow-large sm:p-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-primary-100/60 blur-3xl" />
        <div className="absolute bottom-10 left-[-10%] h-64 w-64 rounded-full bg-secondary-100/40 blur-3xl" />
        <div className="absolute inset-x-10 top-32 h-20 rounded-full bg-default-200/60 blur-2xl" />
      </div>

      <section className="space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Chip color="secondary" size="sm" variant="flat">
              GraphQL Explorer
            </Chip>
            <Chip size="sm" variant="bordered">
              Rick and Morty API
            </Chip>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
                Explore <span className="gradient-text animate-gradient">multiverse favorites</span> and map every{" "}
                <span className="gradient-text animate-gradient">alternate self</span>.
              </h1>
              <p className="text-base text-default-600">
                Search, paginate, and tap into detailed records using Apollo Client and the Rick and Morty GraphQL API.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-default-600">
              <div className="rounded-full border border-default-200 bg-content1 px-3 py-1">
                {totalCount.toLocaleString()} total
              </div>
              <div className="rounded-full border border-default-200 bg-content1 px-3 py-1">
                Page {page} / {totalPages}
              </div>
              <div aria-live="polite" className="rounded-full border border-default-200 bg-content1 px-3 py-1">
                {resultsCount} shown
              </div>
            </div>
          </div>
        </header>

        <Card className="border border-default-200 bg-content1 shadow-medium">
          <CardBody className="gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-display text-2xl font-semibold text-foreground">Character roster</p>
                <p className="text-sm text-default-500">
                  Keep track of status, species, and origin across the multiverse.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:max-w-xl">
                <div className="w-full">
                  <SearchBar onChange={setInputValue} value={inputValue} />
                </div>
              </div>
            </div>

            {error && !isNotFound ? (
              <Alert color="danger" title="Unable to load characters">
                {error.message}
              </Alert>
            ) : null}

            {loading ? <CharacterSkeleton count={10} /> : null}

            {!loading && hasResults ? (
              <CharacterTable characters={characters} onSelect={(character) => setSelectedId(character.id, "push")} />
            ) : null}

            {showEmpty ? (
              <div className="rounded-xl border border-dashed border-default-200 p-10 text-center">
                <p className="text-base font-medium text-foreground">No characters match that search yet.</p>
                <p className="text-sm text-default-500">Try a different name or clear the filter to see everyone.</p>
              </div>
            ) : null}

            {!loading ? <PaginationControls info={info} onPageChange={goToPage} page={page} /> : null}
          </CardBody>
        </Card>
      </section>

      <CharacterDrawer
        character={selectedCharacter}
        characterId={selectedId}
        isOpen={Boolean(selectedId)}
        onClose={() => setSelectedId(null, "replace")}
      />
    </div>
  );
}
