// Refuses to publish unless catalog.json is signed with the Agni catalog key.
// Runs in CI before every deploy; the app checks the same signature itself.

import { createPublicKey, verify } from "node:crypto";
import { readFileSync } from "node:fs";

// The DER prefix that wraps a raw 32-byte Ed25519 public key as SPKI.
const ED25519_SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");
const raw = Buffer.from(readFileSync("public-key.txt", "utf8").trim(), "base64");
const key = createPublicKey({ key: Buffer.concat([ED25519_SPKI_PREFIX, raw]), format: "der", type: "spki" });

const catalog = readFileSync("catalog.json");
const signature = Buffer.from(readFileSync("catalog.json.sig", "utf8").trim(), "base64");
if (!verify(null, catalog, key, signature)) {
  console.error("catalog.json.sig doesn't match catalog.json. Sign the catalog before publishing.");
  process.exit(1);
}
const { serial, updated, models } = JSON.parse(catalog);
console.log(`Catalog serial ${serial} (${models.length} models, updated ${updated}) is correctly signed.`);
