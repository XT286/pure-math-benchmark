# Reference-Grounded Generation

This directory holds the inputs for provenance-first candidate generation.

## Design

The pipeline is intentionally conservative:

- every candidate is tied to a curated source in `source_catalog.yaml`
- every candidate begins as a structured seed in `section_seed_specs.yaml`
- generated output goes to `benchmark/generated-candidates/`, not the canonical `benchmark/queries/`
- each generated package includes `query.yaml`, `rubric.yaml`, `solution.yaml`, and `provenance.yaml`

## Why separate candidates?

Generated items are not automatically benchmark items. They remain `draft`
candidates until:

1. an area expert confirms the mathematical soundness of the query
2. an area expert confirms the rubric admits standard valid approaches
3. an editor reviews contamination risk, clarity, and MSC placement

## Running the pipeline

Use:

```bash
npm run candidates:generate
```

This regenerates the entire `benchmark/generated-candidates/` tree from the
current source catalog and seed batch.
