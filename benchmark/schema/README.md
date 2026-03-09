# Schema

The schema layer now treats `official MSC2020 classification`, `query ownership`, and
`review artifact separation` as first-class concepts.

## Files

- `item.schema.json` defines query source files
- `rubric.schema.json` defines per-query answer rubrics
- `query-area-review.schema.json` defines field-expert review of the query itself
- `query-rubric-review.schema.json` defines field-expert review of the answer rubric
- `reference-source-catalog.schema.json` defines the curated source catalog for candidate generation
- `candidate-seed-batch.schema.json` defines the structured seed inputs for reference-grounded candidate generation

## Design goals

- use official MSC paths instead of a benchmark-internal taxonomy
- separate stable query content from mutable review artifacts
- make field ownership and reviewer eligibility explicit
- keep the repo ready for a later review portal without changing source-of-truth data

## Review model

Each query can now accumulate distinct review artifacts:

1. `query area review`
2. `query rubric review`
3. later, optional model-answer evaluation artifacts

This keeps expert review focused on:

- whether the `query` is mathematically sound and correctly placed in its area
- whether the `rubric` fairly evaluates valid answers in that area

## Candidate generation

Reference-grounded candidate generation uses:

1. a curated source catalog
2. structured seed specs keyed by official MSC leaf codes
3. generated candidate packages kept separate from canonical benchmark queries
