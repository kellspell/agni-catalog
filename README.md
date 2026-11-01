# Agni AI Catalog

The curated model catalog for the Agni AI Browser, served by GitHub Pages at
<https://kellspell.github.io/agni-catalog/catalog.json>.

It holds **metadata only** (names, descriptions, licenses, file checksums and
which Hugging Face / ModelScope repo each model lives in). The app downloads
every model directly from those hubs.

## Trust

`catalog.json` is signed with an Ed25519 key (`catalog.json.sig`). The app has
the public key built in and rejects unsigned, tampered or older catalogs. The
publish workflow also refuses to deploy a catalog whose signature doesn't match.

## Updating

Don't edit these files here. Edit `catalog/catalog.json` in the app project,
bump `serial`, then run `npm run catalog:sign` and `npm run catalog:publish`.
