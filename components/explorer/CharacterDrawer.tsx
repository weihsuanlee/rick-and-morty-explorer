"use client";

import { useQuery } from "@apollo/client/react";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";

import {
  CHARACTER_BY_ID_QUERY,
  type CharacterByIdQuery,
  type CharacterByIdQueryVariables,
  type CharactersQuery,
} from "@/lib/graphql/characters";

type CharacterDrawerProps = {
  character: NonNullable<
    NonNullable<CharactersQuery["characters"]>["results"]
  >[number] | null;
  characterId: string | null;
  isOpen: boolean;
  onClose: () => void;
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

export function CharacterDrawer({
  character,
  characterId,
  isOpen,
  onClose,
}: CharacterDrawerProps) {
  const queryId = characterId ?? character?.id ?? null;
  const { data, loading } = useQuery<
    CharacterByIdQuery,
    CharacterByIdQueryVariables
  >(CHARACTER_BY_ID_QUERY, {
    variables: queryId ? { id: queryId } : undefined,
    skip: !isOpen || !queryId,
  });

  const details:
    | NonNullable<CharacterByIdQuery["character"]>
    | CharacterDrawerProps["character"]
    | null =
    data?.character ?? character ?? null;
  const episodeCount = details?.episode?.length ?? 0;
  const episodes =
    details && "episode" in details
      ? details.episode.filter((episode) => Boolean(episode.name))
      : [];

  return (
    <Drawer
      aria-label="Character details"
      hideCloseButton
      isDismissable
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      placement="right"
      size="lg"
    >
      <DrawerContent>
        {(close) => (
          <>
            <DrawerHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                    Character details
                  </p>
                  <h3 className="font-display text-2xl font-semibold">
                    {character?.name ?? "Character details"}
                  </h3>
                </div>
                <Button
                  aria-label="Close character details"
                  onPress={() => {
                    close();
                    onClose();
                  }}
                  size="sm"
                  variant="flat"
                >
                  Close
                </Button>
              </div>
            </DrawerHeader>
            <DrawerBody className="gap-6">
              {!details ? (
                <p className="text-default-500">
                  {loading
                    ? "Loading character details..."
                    : characterId
                      ? "Character not found."
                      : "Select a character to see more information."}
                </p>
              ) : (
                <>
                  <div className="flex gap-4">
                    <Image
                      alt={details.name}
                      className="h-32 w-32 object-cover"
                      radius="lg"
                      src={details.image}
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <Chip color={statusColor(details.status)} variant="flat">
                        {details.status}
                      </Chip>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                          Species
                        </p>
                        <p className="text-base font-medium">
                          {details.species}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                          Gender
                        </p>
                        <p className="text-base font-medium">
                          {details.gender}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div className="grid gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                        Origin
                      </p>
                      <p className="text-base font-medium">
                        {details.origin?.name ?? "Unknown"}
                      </p>
                    </div>
                    {"type" in (details ?? {}) ? (
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                          Type
                        </p>
                        <p className="text-base font-medium">
                          {details.type || "Unknown"}
                        </p>
                      </div>
                    ) : null}
                    {"created" in (details ?? {}) ? (
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                          First seen
                        </p>
                        <p className="text-base font-medium">
                          {new Date(details.created).toLocaleDateString()}
                        </p>
                      </div>
                    ) : null}
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                        Last known location
                      </p>
                      <p className="text-base font-medium">
                        {details.location?.name ?? "Unknown"}
                      </p>
                    </div>
                    {episodes.length > 0 ? (
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                          Episodes
                        </p>
                        <p className="mt-1 text-sm text-default-500">
                          {episodeCount} appearances
                        </p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {episodes.map((episode) => (
                            <div
                              key={episode.id}
                              className="rounded-lg border border-default-200 bg-content2/70 px-3 py-3"
                            >
                              <p className="text-sm font-medium text-foreground">
                                {episode.name}
                              </p>
                              <p className="text-xs text-default-500">
                                {episode.episode}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-default-500">
                          Episode appearances
                        </p>
                        <p className="text-base font-medium">{episodeCount}</p>
                      </div>
                    )}
                  </div>
                  {loading ? (
                    <p className="text-xs text-default-500">Loading details...</p>
                  ) : null}
                </>
              )}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
