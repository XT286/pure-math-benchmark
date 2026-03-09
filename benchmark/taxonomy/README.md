# Taxonomy

The repository now uses the official `MSC2020` hierarchy as the canonical taxonomy.

## Canonical files

- `msc2020/tree.yaml` contains the imported official hierarchy
- `msc2020/coverage.yaml` tracks benchmark coverage by MSC section
- `legacy_aliases.yaml` maps the original benchmark-specific taxonomy to official MSC sections during migration

## Official hierarchy model

The benchmark works with official MSC levels:

1. `section`, represented as codes such as `03-XX`
2. `subclass`, represented as codes such as `03Cxx`
3. `leaf`, represented as codes such as `03C64`

Filesystem paths simplify those levels for browsing:

- section directory: `03`
- subclass directory: `03C`
- leaf directory: `03C64`

## Query ownership

Each query now carries:

- one `primary_msc_code`
- one `primary_msc_path`
- optional secondary MSC codes
- one `owning_area_code`

The owning area determines who should review:

- the query itself
- the rubric used to evaluate answers to that query

## Coverage philosophy

The benchmark is no longer restricted to a reduced pure-math taxonomy. The data model is ready for broad mathematical coverage across most of MSC, while the coverage registry tracks which areas are merely in scope, seeded, reviewed, or released.
