# Candidate Catalog And Generation Roadmap

This document records the current implementation roadmap for surfacing generated
candidate queries in the public catalog while preserving the distinction between
reviewed benchmark items and unreviewed candidate content.

## Primary outcomes

The roadmap has four linked goals:

1. Show generated candidate coverage on the public site instead of only the
   reviewed canonical query tree.
2. Keep reviewed benchmark items and draft candidates visibly separate.
3. Prioritize algebraic-geometry enrichment as the next deeper subject-area
   expansion.
4. Encode the benchmark's generation standards in a reusable Cursor skill so
   future query-generation sessions do not require restating the full benchmark
   charter.

## Public catalog outcome

The website should accurately surface both:

- reviewed canonical benchmark content from `benchmark/queries/`
- draft reference-grounded candidate content from
  `benchmark/generated-candidates/`

This means homepage counts, MSC section counts, field navigation, and detail
pages should distinguish:

- reviewed queries
- draft candidate queries
- total visible content

Candidate items should be publicly browsable, but they must be labeled as
`draft` and `not yet expert reviewed`.

## Generation program outcome

The benchmark should move beyond the first conservative generation pass of 39
candidate items.

The next generation program should:

- expand underseeded pure-math coverage across the MSC hierarchy
- preserve broad representation at section, subclass, and leaf levels
- prioritize algebraic geometry as the flagship enrichment area
- keep all new items provenance-first and review-gated

## Query generation methodology

The benchmark standard is defined by the repository README: this project targets
`research-style pure mathematical reasoning` and is designed around the kinds of
questions that advanced graduate students, PhD candidates, postdocs, and working
mathematicians might actually ask an LLM during real mathematical research.

Generated queries should therefore be:

- grounded in authoritative sources rather than free-form model invention
- framed as research-style questions, not routine textbook or contest prompts
- aligned with plausible research use, such as theorem selection, hypothesis
  checking, counterexample construction, proof strategy, framework comparison,
  and meaningful partial progress
- assigned to official MSC codes with auditable ownership metadata
- packaged with a rubric, solution outline, and provenance record

### Required workflow

1. Start from curated references in `benchmark/generation/source_catalog.yaml`.
2. Extract a theorem-level or concept-level seed before writing the final query.
3. Adapt the seed into a benchmark question without shallow copying.
4. Assign official MSC placement and owning area during generation.
5. Generate the rubric and solution outline together with the query.
6. Run internal quality checks before marking the item review-ready.

### Required quality gates

A generated query matches the benchmark standard only if it is:

- suitable for advanced graduate students, PhD students, postdocs, or researchers
- plausibly something a mathematical researcher might actually ask an LLM
- centered on research-style reasoning rather than final-answer scoring
- auditable by an expert using the source, rubric, and solution outline
- free of obvious hypothesis gaps, false conclusions, or unsupported source claims

### Anti-patterns

Reject:

- definition-only prompts
- reference-request prompts
- routine short-answer textbook exercises
- contest-style stand-ins for research mathematics
- prompts with unsupported model-invented mathematics

## Promotion outcome

The roadmap also requires an explicit path from candidate item to canonical
benchmark item.

Promotion should require:

1. area review of query soundness and MSC placement
2. rubric review in the relevant field
3. editorial adjudication of disagreements, clarity, and contamination risk
4. migration from `benchmark/generated-candidates/` into `benchmark/queries/`

## Implementation tracks

### Catalog track

- extend the catalog build to ingest both canonical and candidate trees
- add layer-aware helpers for canonical, candidate, and combined views
- update homepage and MSC navigation to show both count types
- add candidate detail pages
- refresh section, subclass, and leaf pages to list reviewed and candidate items
  separately

### Generation track

- expand `benchmark/generation/source_catalog.yaml`
- expand `benchmark/generation/section_seed_specs.yaml`
- deepen algebraic-geometry seeding under `benchmark/generated-candidates/14/`
- define review-ready and promotion-ready quality states

### Reusability track

- create a personal Cursor skill under `~/.cursor/skills/`
- capture benchmark mission, quality bar, anti-goals, provenance-first workflow,
  review expectations, and output conventions

## Acceptance criteria

This roadmap is successful when:

- the public site no longer underreports coverage
- candidate and reviewed content are clearly distinguished everywhere
- algebraic geometry has visibly richer candidate depth
- the repository defines how generated items become canonical benchmark items
- future query-generation sessions can reuse the same benchmark guidance through
  a saved skill
