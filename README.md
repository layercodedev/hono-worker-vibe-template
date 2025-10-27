# Hono Worker Vibe App Template

LLMs can struggle with complex UI frameworks and css libraries. I've found that using simple lindy technologies like server side rendering and vanilla js and css leads to more reliable and rapid development with Codex or Claude Code.

This repo is a template starter with my preferred setup:

- Cloudflare Worker
- Hono router
- Server side JSX templating
- Regaular CSS with a nice initial theme to work from
- HTMX for light client interactivity
- Cloudflare D1 database for data storage

## Setup

```sh
pnpm install
```

### Configure D1

1. Create (or identify) a D1 database:
   ```sh
   pnpm wrangler d1 create my-db
   ```
2. Update the `database_id` inside `wrangler.jsonc` with the value returned from the command above.
3. Apply the migrations:
   ```sh
   pnpm wrangler d1 migrations apply my-db
   # or run locally
   pnpm wrangler d1 migrations apply my-db --local
   ```

For a full local reset (drop, recreate, and reseed episodes):
```sh
pnpm run db:reset:local
```

### Production Deploy

```sh
pnpm run deploy
```

### Type Generation

Run Wrangler's type generation when bindings change:

```sh
pnpm run cf-typegen
```
