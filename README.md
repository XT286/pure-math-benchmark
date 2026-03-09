# Pure Math Benchmark

`Pure Math Benchmark` is a public benchmark initiative for evaluating `research-style pure mathematical reasoning` in language models.

The project is designed around the kinds of questions that advanced graduate students, PhD candidates, postdocs, and working mathematicians actually face: selecting the right theorem, identifying a missing hypothesis, constructing a counterexample, outlining a proof strategy, comparing equivalent formalisms, and making mathematically valid progress on hard but answerable problems.

## Why this benchmark exists

Public math evaluation has moved quickly, but the dominant benchmark families still leave a major gap:

- grade-school and general math QA benchmarks mainly test short-answer problem solving
- olympiad and competition benchmarks mainly test polished contest reasoning
- undergraduate subject benchmarks emphasize coursework coverage
- formal theorem-proving benchmarks measure formalization and proof-assistant interaction

None of those categories directly targets broad, `research-grade pure mathematics` as it is practiced in natural-language mathematical work.

This benchmark aims to fill that gap with:

- an `MSC-inspired taxonomy` that spans major pure-math subject families
- `expert-reviewed items` with explicit metadata, provenance, and verification state
- `argument-centered evaluation` that rewards correctness, rigor, theorem applicability, and meaningful partial progress
- a `community governance model` intended to support long-term use as a shared standard

## What this benchmark measures

The benchmark focuses on capabilities that are central to mathematical research literacy:

- proof architecture and proof strategy
- theorem applicability and hypothesis checking
- construction of examples and counterexamples
- comparison of advanced frameworks or formulations
- local-to-global reasoning and transfer arguments
- mathematically meaningful partial progress when a full proof is not completed

## What this benchmark is not

This project is not:

- a generic STEM benchmark
- a short-answer leaderboard for school mathematics
- a contest-math benchmark in disguise
- a benchmark for open conjecture solving
- a replacement for formal theorem-proving evaluations

See [`docs/scope-and-non-goals.md`](docs/scope-and-non-goals.md) for the full scope statement.

## Comparison with existing public eval sets

The benchmark is intentionally designed to complement, rather than replicate, current public math evaluations.

| Benchmark family | Typical strength | Main limitation for pure math research evaluation |
| --- | --- | --- |
| `GSM8K`-style QA | arithmetic and school-level reasoning | far below research abstraction level |
| `MATH` / olympiad-style sets | difficult bounded problem solving | still dominated by competition format and final-answer scoring |
| undergraduate subject benchmarks | breadth across course topics | closer to curriculum coverage than mathematical research practice |
| formal theorem-proving benchmarks such as `miniF2F` | rigorous formal validity | measures a different interface: formal proof construction rather than natural-language research reasoning |
| recent proof-oriented public benchmarks | closer to argument evaluation | still limited in breadth, governance, or sustained community review |

See [`docs/benchmark-landscape.md`](docs/benchmark-landscape.md) for a fuller comparison.

## Initial release goals

The first public release is designed to establish standards before scale:

- a seeded benchmark corpus organized by subject family, subfield, and finer topic
- an explicit mapping to `MSC2020`
- a structured benchmark item schema and review schema
- an expert-review rubric for proofs, counterexamples, and theorem-selection tasks
- governance, versioning, correction, and conflict-of-interest policies
- an `arXiv`-ready whitepaper explaining the benchmark and inviting mathematician participation

## Repository layout

- [`benchmark/`](benchmark/) contains taxonomy, schema, rubrics, and benchmark items
- [`docs/`](docs/) contains scope, comparison, authoring guidance, and release process
- [`governance/`](governance/) contains governance, conflicts, editorial, and reviewer materials
- [`community/`](community/) contains participation and feedback-loop documents
- [`paper/`](paper/) contains the manuscript and bibliography for public circulation

## Participation

This project is designed to be shaped by mathematicians, not only by model builders.

We welcome:

- subject-matter experts willing to review items
- contributors proposing benchmark items with documented provenance
- mathematicians who want to critique taxonomy coverage or scoring policy
- researchers interested in careful, reproducible evaluation rather than benchmark gaming

See [`community/call-for-participation.md`](community/call-for-participation.md) and [`community/feedback-channels.md`](community/feedback-channels.md).

## Current status

This repository is an initial public scaffold for the benchmark program. The seed release emphasizes rigor, reviewability, and breadth of design over raw item count.
