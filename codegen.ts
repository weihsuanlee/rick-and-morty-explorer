import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["graphql/**/*.graphql"],
  generates: {
    "__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
