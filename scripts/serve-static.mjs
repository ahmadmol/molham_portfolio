import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzip } from "node:zlib";
import { promisify } from "node:util";
const compress = promisify(gzip);

const root = resolve(process.env.OUT_DIR || "out");
const prefix = "/molham_portfolio";
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === prefix) {
      res.writeHead(308, { Location: prefix + "/" });
      res.end();
      return;
    }
    if (!url.pathname.startsWith(prefix + "/")) throw new Error("Outside site");
    let file = resolve(
      root,
      "." + decodeURIComponent(url.pathname.slice(prefix.length)),
    );
    if (file !== root && !file.startsWith(root + sep))
      throw new Error("Outside root");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    let bytes = await readFile(file);
    const type = mime[extname(file)] || "application/octet-stream";
    const headers = {
      "Content-Type": type,
      Vary: "Accept-Encoding",
      "Cache-Control":
        extname(file) === ".html" ? "no-cache" : "public, max-age=600",
    };
    if (
      req.headers["accept-encoding"]?.includes("gzip") &&
      /text|javascript|json|svg/.test(type)
    ) {
      bytes = await compress(bytes);
      headers["Content-Encoding"] = "gzip";
    }
    res.writeHead(200, headers);
    res.end(bytes);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(Number(process.env.PORT || 4173), "127.0.0.1", () =>
  console.log(
    `Static preview: http://127.0.0.1:${process.env.PORT || 4173}${prefix}/`,
  ),
);
