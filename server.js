import express from "express";
import compression from "compression";

const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(compression());

const BLOCKED = [
  "server.js",
  "package.json",
  "bun.lock",
  "node_modules",
  ".git",
  ".env",
];
app.use((req, res, next) => {
  if (
    BLOCKED.some(
      (p) => req.path === "/" + p || req.path.startsWith("/" + p + "/"),
    )
  )
    return res.status(404).end();
  next();
});
app.use(
  express.static(".", {
    maxAge: 0,
    setHeaders: (res, path) => {
      if (
        path.match(
          /\.(png|jpg|jpeg|avif|webp|gif|svg|ico|mp4|mov|webm|mp3|woff2?|ttf|css|js)$/,
        )
      ) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  }),
);

app.listen(3000, () => console.log("http://localhost:3000"));
