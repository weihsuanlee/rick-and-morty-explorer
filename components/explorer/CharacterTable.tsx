"use client";

import type { CharactersQuery } from "@/lib/graphql/characters";
import { CharacterCard } from "@/components/explorer/CharacterCard";

type Character = NonNullable<NonNullable<CharactersQuery["characters"]>["results"]>[number];

type CharacterTableProps = {
  characters: Character[];
  onSelect: (character: Character) => void;
};

export function CharacterTable({ characters, onSelect }: CharacterTableProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {characters.map((character) => {
        if (!character) return null;

        return <CharacterCard character={character} key={character.id ?? character.name} onSelect={onSelect} />;
      })}
    </div>
  );
}
