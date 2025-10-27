import { Hono } from "hono";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import type { Bindings } from "./types/bindings";

type PageMeta = {
  title?: string;
  description?: string;
};

type AppEnv = {
  Bindings: Bindings;
  Variables: {
    pageMeta?: PageMeta;
  };
};
const DEFAULT_TITLE = "my-app";

const app = new Hono<AppEnv>();

app.use(
  "*",
  jsxRenderer(({ children }) => {
    const c = useRequestContext<AppEnv>();
    const meta = c.get("pageMeta") ?? {};
    const title = meta.title ?? DEFAULT_TITLE;
    const description = meta.description;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {description && <meta name="description" content={description} />}
          <title>{title}</title>
          <link rel="stylesheet" href="/normalize.css" />
          <link rel="stylesheet" href="/milligram.css" />
          <link rel="stylesheet" href="/blue-retro-light-dark.css" />
          <link rel="stylesheet" href="/app.css" />
        </head>
        <body>{children}</body>
      </html>
    );
  }),
);

app.get("/", async (c) => {
  const episodes = await getEpisodes(c.env.DB);

  c.set("pageMeta", {
    title: DEFAULT_TITLE,
    description:
      "Listen to a curated list of podcast episodes with resume playback and completion tracking.",
  });

  return c.render(<h1>Hello Vibe Coding World</h1>);
});

export default app;
