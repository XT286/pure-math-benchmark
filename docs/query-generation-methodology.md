# Query Generation Methodology

This document defines how new benchmark queries should be generated so that they
match the project's intended standard.

## Standard to match

The benchmark targets `research-style pure mathematical reasoning`, not generic
hard math.

Generated queries should resemble the kinds of questions that advanced graduate
students, PhD candidates, postdocs, and working mathematicians might actually
ask an LLM during research. Typical examples include:

- checking whether a theorem really applies in a given setting
- finding a missing hypothesis in a proposed argument
- constructing or diagnosing a counterexample
- outlining a plausible proof strategy
- comparing two advanced frameworks or formulations
- making mathematically meaningful partial progress on a hard but answerable task

## Required workflow

1. Start from an authoritative source.
2. Extract a theorem-level or concept-level seed.
3. Adapt that seed into a benchmark query without shallow copying.
4. Assign official MSC placement and owning-area metadata.
5. Generate the rubric, solution outline, and provenance record together with the query.
6. Run internal quality checks before calling the item review-ready.

## Source requirements

Valid source bases include:

- standard graduate monographs
- authoritative field references
- carefully chosen lecture notes or surveys
- benchmark-commissioned original items only when the underlying mathematical basis is explicit

Do not generate a query unless the core mathematical content is supported by a
real cited source.

## Query requirements

A generated query should be:

- mathematically sound
- auditable against a source
- correctly placed in the official MSC hierarchy
- suitable for advanced graduate students, PhD students, postdocs, or researchers
- research-use realistic rather than merely difficult
- rich enough to support rubric-based expert evaluation

## Preferred query families

- theorem applicability
- proof strategy
- hypothesis sensitivity
- classification
- counterexample
- framework comparison
- invariant interpretation

## Required package contents

Every generated candidate should include:

- `query.yaml`
- `rubric.yaml`
- `solution.yaml`
- `provenance.yaml`

The query should never be generated in isolation.

## Quality gates

Before a generated item is considered ready for expert review, it should pass
all of the following:

- no missing essential hypotheses
- no false or underdetermined conclusion
- no guessed MSC placement
- rubric allows standard valid approaches
- solution outline is specific enough to support adjudication
- prompt is not dominated by final-answer scoring
- source basis is strong enough to justify the mathematics confidently

## Anti-patterns

Reject:

- definition-only prompts
- reference-request prompts
- routine textbook drills with standard one-line answers
- contest-style substitutes for research mathematics
- unsupported model-invented mathematical claims
- prompts that a researcher would have no reason to ask during actual mathematical work

## Candidate state progression

Recommended state progression:

1. `source_seeded`
2. `candidate_generated`
3. `internally_checked`
4. `review_ready_candidate`
5. `canonical_benchmark_item`
