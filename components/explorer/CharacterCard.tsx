"use client";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";

import { StatusChip } from "@/components/explorer/StatusChip";
import { CHARACTER_IMAGE_PLACEHOLDER } from "@/lib/constants/placeholders";
import type { CharactersQuery } from "@/lib/graphql/characters";

type Character = NonNullable<NonNullable<CharactersQuery["characters"]>["results"]>[number];

type CharacterCardProps = {
  character: Character;
  onSelect: (character: Character) => void;
};

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  return (
    <Card
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
                alt={character.name || "Character image"}
                className="h-12 w-12 object-cover"
                radius="full"
                fallbackSrc={CHARACTER_IMAGE_PLACEHOLDER}
                src={character.image || CHARACTER_IMAGE_PLACEHOLDER}
              />
            </div>
            <div className="min-w-0">
              <p className="line-clamp-2 font-display text-lg font-semibold text-foreground">{character.name}</p>
              <p className="text-xs text-default-500">{character.origin?.name ?? "Unknown origin"}</p>
            </div>
          </div>
          <StatusChip status={character.status} size="sm" variant="flat" />
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
  );
}
