"use client";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";

import type { CharactersQuery } from "@/lib/graphql/characters";

type Character = NonNullable<
  NonNullable<CharactersQuery["characters"]>["results"]
>[number];

type CharacterTableProps = {
  characters: Character[];
  onSelect: (character: Character) => void;
};

function statusColor(status: string) {
  switch (status.toLowerCase()) {
    case "alive":
      return "success";
    case "dead":
      return "danger";
    default:
      return "warning";
  }
}

export function CharacterTable({ characters, onSelect }: CharacterTableProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {characters.map((character) => (
        <Card
          key={character.id}
          aria-label={`View details for ${character.name}`}
          className="cyber-card bg-content1 shadow-medium hover:shadow-large hover:bg-content2 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          isPressable
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect(character);
            }
          }}
          onPress={() => onSelect(character)}
          tabIndex={0}
        >
          <CardBody className="gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Image
                    alt={character.name}
                    className="h-12 w-12 object-cover"
                    radius="full"
                    src={character.image}
                  />
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-2 font-display text-lg font-semibold text-foreground">
                    {character.name}
                  </p>
                  <p className="text-xs text-default-500">
                    {character.origin?.name ?? "Unknown origin"}
                  </p>
                </div>
              </div>
              <Chip color={statusColor(character.status)} size="sm" variant="flat">
                {character.status}
              </Chip>
            </div>

            <div className="flex flex-wrap gap-2">
              <Chip size="sm" variant="bordered">
                {character.species}
              </Chip>
              <Chip size="sm" variant="bordered">
                {character.gender}
              </Chip>
              <Chip size="sm" variant="bordered">
                {character.location?.name ?? "Unknown location"}
              </Chip>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
