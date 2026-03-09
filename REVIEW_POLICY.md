# Review Policy

## Purpose

This policy defines how benchmark queries and their answer rubrics move from draft material to accepted public benchmark content.

## Item lifecycle

Each query passes through one of the following states:

1. `draft`
2. `query_reviewed`
3. `rubric_reviewed`
4. `query_and_rubric_reviewed`
5. `released`
6. `deprecated`
7. `retracted`

## Acceptance requirements

A query should normally satisfy all of the following before release:

- clear mathematical statement and notation
- explicit success criteria
- documented provenance and license status
- contamination and leakage assessment
- at least one area review of the query
- at least one review of the attached answer rubric
- handling-editor signoff

## Reasons for revision or rejection

An item should be revised or rejected if it has:

- ambiguous notation
- omitted key hypotheses
- unreviewable or open-ended success criteria
- doubtful provenance or rights status
- a flawed canonical solution
- excessive contamination risk for its intended split

## Deprecation and retraction

An item may be `deprecated` when it remains mathematically sound but is no longer appropriate for active benchmark use, for example because of saturation, duplication, or changed release policy.

An item should be `retracted` when it is materially unsound, improperly sourced, or compromised by severe ambiguity or leakage.

## Post-release corrections

Post-release corrections must be public and versioned. The repository must not silently rewrite the semantics of an accepted item.

## Appeals

Contributors and reviewers may appeal handling decisions. Appeals should be routed through the editorial process described in [`GOVERNANCE.md`](GOVERNANCE.md) and the procedures in [`governance/appeals-and-corrections.md`](governance/appeals-and-corrections.md).
