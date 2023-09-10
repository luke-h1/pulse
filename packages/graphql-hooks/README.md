# Graphql-hooks

> GraphQL code generator consumed by admin and frontend. 

## About

This project introspets the GraphQL API and generates TypeScript types and React hooks for the queries and mutations. Consumed by the admin and frontend apps.

## Usage

Generate types and hooks for admin and frontend queries, mutations etc.

```sh
pnpm gen
```

This will generate a `src/generated` directory with the generated code based on the queries and mutations found in the `documents` property of `codegen.ts`.

