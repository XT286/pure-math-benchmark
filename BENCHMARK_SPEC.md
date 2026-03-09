# Benchmark Specification

## Purpose

`Pure Math Benchmark` evaluates the ability of a model or system to produce mathematically valid reasoning in advanced pure mathematics.

## Task model

Each item presents a mathematically meaningful task such as:

- determine whether a theorem applies in a stated setting
- identify a missing hypothesis
- construct an example or counterexample
- outline or complete a proof strategy
- compare equivalent mathematical frameworks
- explain the significance of an invariant or condition

The benchmark is not restricted to final-answer tasks. Long-form mathematical responses are in scope whenever they remain reviewable.

## Intended difficulty range

Items target:

- advanced graduate level
- PhD research literacy
- specialist expert depth

## Taxonomy

Each item carries:

- one primary `subject_family`
- one primary `subfield`
- one primary `finer_topic`
- one or more `msc2020_codes`
- optional secondary tags for cross-field content

See [`benchmark/taxonomy/README.md`](benchmark/taxonomy/README.md).

## Item requirements

Each accepted benchmark item must define:

- the mathematical statement or prompt
- notation conventions
- assumed prerequisites
- success criteria
- answer format
- provenance and license status
- review and verification status

## Evaluation philosophy

The benchmark evaluates:

- correctness of the central mathematical claim
- soundness of reasoning
- correct use of assumptions and definitions
- completeness relative to the prompt
- usefulness of partial progress

The benchmark does not treat theorem naming alone as a sufficient answer unless the item explicitly asks for identification only.

## Tool-use policy

Leaderboard or reported runs should disclose:

- whether the model used retrieval
- whether the model had access to computer algebra or proof tools
- whether browsing or internet access was allowed
- whether multiple attempts or self-consistency were used

The repository will support benchmark variants that differ by tool regime, but each reported result must declare the regime clearly.

## Splits

The initial repository includes:

- `examples`
- `public_dev`
- `public_seed`

Later releases may add:

- partially hidden evaluation sets
- hidden expert-administered sets

## Item status lifecycle

Items move through statuses such as:

- `draft`
- `under_review`
- `accepted`
- `deprecated`
- `retracted`

The rules for these states are defined in [`REVIEW_POLICY.md`](REVIEW_POLICY.md).

## Release discipline

Benchmark releases are versioned. Accepted items must not be silently changed after release. Any correction affecting semantics, grading, or metadata must appear in a documented release note.
