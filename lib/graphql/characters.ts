import {
  CharacterByIdDocument,
  CharactersDocument,
} from "@/__generated__/graphql";

export const CHARACTERS_QUERY = CharactersDocument;
export const CHARACTER_BY_ID_QUERY = CharacterByIdDocument;

export type {
  CharacterByIdQuery,
  CharacterByIdQueryVariables,
  CharactersQuery,
  CharactersQueryVariables,
} from "@/__generated__/graphql";
