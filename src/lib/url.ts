export const BASE_PATH = "/molham_portfolio";
/** Accept local public asset paths only, and prefix exactly once. */
export function publicUrl(path: string): string {
  if (
    /^[a-z]+:/i.test(path) ||
    path.startsWith("//") ||
    path.includes("..") ||
    path.includes("\\")
  )
    throw new Error("Expected a local public asset path");
  const normalized = "/" + path.replace(/^\/+/, "");
  return normalized === BASE_PATH || normalized.startsWith(BASE_PATH + "/")
    ? normalized
    : BASE_PATH + normalized;
}
export function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}
export function toAbsoluteUrl(value: string): string {
  return /^https?:\/\//i.test(value)
    ? value
    : `https://${value.replace(/^\/+/, "")}`;
}
/** NEXT_PUBLIC_SITE_URL is an HTTP(S) origin; paths, credentials, queries are rejected. */
export function siteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL): string {
  if (!value) return "https://ahmadmol.github.io";
  const url = new URL(value);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path",
    );
  return url.origin;
}
