// This code generates (typescript) types based on the schema file or GraphQL API provided
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '<URL_OF_YOUR_GRAPHQL_API>',
  documents: ['/**/*.tsx'],
  generates: {
    './__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
