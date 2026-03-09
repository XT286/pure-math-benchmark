# MSC2020 Taxonomy Files

This directory contains the canonical taxonomy for the benchmark.

## Files

- `tree.yaml`: imported official MSC2020 hierarchy
- `coverage.yaml`: benchmark coverage state keyed to official MSC sections

## Notes

- `tree.yaml` is generated from a public MSC2020 SKOS serialization using `scripts/import_msc2020.mjs`.
- `coverage.yaml` is updated from the query source tree during query migration and catalog preparation.
- The benchmark does not treat the taxonomy as a side mapping anymore. Official MSC is now the primary classification structure.
