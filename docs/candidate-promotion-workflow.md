# Candidate Promotion Workflow

This document describes how a generated candidate query becomes a canonical
benchmark item.

## Principle

Generated candidates are public and useful for coverage planning, but they are
not canonical benchmark items until they pass expert and editorial review.

## Promotion stages

1. `generated candidate`
   The query package exists in `benchmark/generated-candidates/` with a query,
   rubric, solution outline, and provenance record.

2. `area-reviewed candidate`
   An expert in the relevant MSC area confirms that the query is mathematically
   sound, well placed, and appropriate for the benchmark.

3. `rubric-reviewed candidate`
   An expert in the area confirms that the rubric recognizes standard valid
   approaches and penalizes real mathematical failures rather than stylistic ones.

4. `editorially adjudicated candidate`
   An editor resolves disagreements, checks notation clarity, and reviews
   contamination risk and release suitability.

5. `canonical benchmark item`
   The item is migrated into `benchmark/queries/` with its associated review
   artifacts and becomes part of the reviewed benchmark tree.

## Promotion requirements

An item should not be promoted unless:

- the statement is mathematically sound
- the MSC placement is defensible
- the rubric is fair and field-appropriate
- the item matches the benchmark's research-style ambition
- contamination and leakage concerns have been reviewed

## Migration target

Approved items move from:

- `benchmark/generated-candidates/`

to:

- `benchmark/queries/`

The public catalog and release manifests should then be regenerated so the item
appears as part of the canonical reviewed benchmark rather than as a draft
candidate.
