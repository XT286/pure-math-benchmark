# Dataset Card

## Summary

`Pure Math Benchmark` is a benchmark initiative for evaluating research-style pure mathematical reasoning in large language models. The benchmark emphasizes argument quality, proof validity, theorem applicability, hypothesis sensitivity, and meaningful partial progress across a broad range of pure-math subject areas.

## Motivation

Current public math evaluation is strong in contest problems, short-answer reasoning, and formal theorem proving, but there is no widely adopted public benchmark standard for natural-language reasoning across advanced pure mathematics. This project aims to help fill that gap.

## Intended use

The benchmark is intended for:

- evaluating research-oriented language models
- comparing prompting or tool-use regimes under clearly stated rules
- studying strengths and weaknesses across pure-math subject families
- supporting community discussion around standards for advanced mathematical evaluation

## Out of scope

The benchmark is not intended for:

- primary school or standard undergraduate drill evaluation
- contest-only leaderboard chasing
- open conjecture solving
- formal theorem proving as the primary task interface

## Composition

Each item includes:

- a primary taxonomy path
- `MSC2020` mappings
- a problem statement with notation and prerequisites
- a problem type and target answer format
- a review and verification state
- provenance and licensing metadata
- contamination and leakage metadata

## Curation

Items are expected to be:

- authored or adapted under documented provenance
- reviewed by domain experts
- versioned under a public correction and deprecation policy

## Evaluation

Scoring is designed to rely on structured expert review, especially for long-form proof or explanation tasks. The benchmark records not only correctness judgments but also gap severity, rigor, and partial progress.

## Risks and limitations

Key limitations include:

- contamination risk for any public mathematics benchmark
- variable reviewer time cost across subjects
- difficulty of calibrating cross-field difficulty precisely
- the challenge of balancing breadth with review quality

## Maintenance

The benchmark is intended to evolve under public governance, expert review, and versioned releases. Release notes should document corrections, item deprecations, and scope changes.
