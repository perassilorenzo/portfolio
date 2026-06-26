import express from "express";

const app = express();
app.use(express.json({ limit: "10kb" }));

// Block sensitive files from static serving
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
app.use(express.static("."));

app.listen(3000, () => console.log("http://localhost:3000"));
