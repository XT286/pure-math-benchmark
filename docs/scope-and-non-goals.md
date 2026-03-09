# Scope And Non-Goals

## Scope

`Pure Math Benchmark` evaluates research-style reasoning in pure mathematics.

The intended question styles include:

- proof planning and proof skeleton construction
- diagnosis of missing hypotheses
- theorem applicability under explicit assumptions
- construction of examples and counterexamples
- comparison of advanced formulations, invariants, or categorical viewpoints
- local-to-global arguments, descent, gluing, localization, and transfer principles
- mathematically meaningful partial progress on difficult but answerable questions

The intended user and reviewer community includes:

- advanced graduate students
- PhD students
- postdoctoral researchers
- faculty and research mathematicians

The intended subject envelope is `pure mathematics`, broadly construed, with an `MSC2020`-aware taxonomy spanning major subject families and their subfields.

## Design principles

- Questions should be `answerable and reviewable`, not open-ended invitations for speculative research.
- Questions should require `mathematical judgment`, not just literature lookup or memorized theorem citation.
- Items should be `expert-readable`, with clear notation, assumptions, and success criteria.
- Coverage should be `broad enough` to represent modern pure mathematics, not only the most benchmark-friendly areas.
- Evaluation should prioritize `argument quality` and `proof validity`, not only the final conclusion.

## Non-goals

This project is not:

1. A benchmark for grade-school or standard undergraduate drill problems.
2. A benchmark centered on olympiad or contest-style mathematics.
3. A benchmark for open conjecture solving or original theorem discovery.
4. A broad STEM benchmark that mixes pure math with unrelated scientific reasoning tasks.
5. A formal-proof benchmark whose primary interface is Lean, Coq, Isabelle, or another proof assistant.
6. A literature-retrieval benchmark where success is mainly naming the correct paper or theorem.

## Boundary cases

Some areas sit near the edge of the intended scope. The project will generally include them only when the task remains recognizably part of pure mathematics:

- `mathematical physics` when the reasoning is squarely mathematical rather than physical modeling
- `dynamical systems` when the task targets pure-math structure or proof
- `probability`, `ODE`, or `PDE` only in later expansions if the community agrees that broader theoretical mathematics should be included

## Release philosophy

The public benchmark should prefer:

- fewer items with strong expert review
- explicit provenance and contamination checks
- transparent correction and deprecation policies
- steady expansion under editorial control

over:

- a large but weakly checked dataset
- ambiguous questions
- unstable taxonomy
- silent post-release edits
