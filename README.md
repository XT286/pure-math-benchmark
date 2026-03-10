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

- the official `MSC2020` hierarchy as the canonical taxonomy
- `query-centered expert review` in the relevant field, rather than only generic benchmark review
- `per-query answer rubrics` that can themselves be reviewed by experts in that field
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

See [`docs/candidate-catalog-roadmap.md`](docs/candidate-catalog-roadmap.md) for
the current roadmap covering candidate-query surfacing, generation methodology,
promotion workflow, and algebraic-geometry prioritization.
See [`docs/query-generation-methodology.md`](docs/query-generation-methodology.md)
for the standard-compliant query generation workflow, and
[`docs/candidate-promotion-workflow.md`](docs/candidate-promotion-workflow.md)
for how generated candidates become canonical benchmark items.

## Current release goals

The current redesign is focused on the benchmark source-of-truth itself:

- a seeded benchmark corpus organized directly by official `MSC2020` paths
- per-query source files under `benchmark/queries/`
- a structured query schema plus dedicated schemas for `query area review` and `query rubric review`
- field ownership metadata so mathematicians can review content in their own area
- a public browsable catalog that routes experts directly to the relevant MSC pages, queries, and rubrics
- governance, versioning, correction, and conflict-of-interest policies
- an `arXiv`-ready whitepaper explaining the benchmark and inviting mathematician participation

## Repository layout

- [`benchmark/taxonomy/msc2020/`](benchmark/taxonomy/msc2020/) contains the canonical MSC tree and coverage registry
- [`benchmark/queries/`](benchmark/queries/) contains per-query source files organized by MSC path
- [`benchmark/schema/`](benchmark/schema/) contains query, rubric, and review schemas
- [`benchmark/releases/`](benchmark/releases/) contains generated release bundles
- [`docs/`](docs/) contains scope, comparison, authoring guidance, and release process
- [`governance/`](governance/) contains governance, conflicts, editorial, and reviewer materials
- [`community/`](community/) contains participation and feedback-loop documents
- [`paper/`](paper/) contains the manuscript and bibliography for public circulation
- [`site/`](site/) contains the public catalog frontend

## Participation

This project is designed to be shaped by mathematicians, not only by model builders.

We welcome:

- subject-matter experts willing to review `queries in their own MSC area`
- subject-matter experts willing to review `the answer rubrics attached to those queries`
- contributors proposing benchmark items with documented provenance
- mathematicians who want to critique taxonomy coverage or area ownership
- researchers interested in careful, reproducible evaluation rather than benchmark gaming

See [`community/call-for-participation.md`](community/call-for-participation.md) and [`community/feedback-channels.md`](community/feedback-channels.md).

## Current status

This repository now includes:

- an imported official `MSC2020` hierarchy
- a migrated per-query corpus under `benchmark/queries/`
- per-query rubric files and review artifacts
- a static public catalog for browsing by MSC field

The next major phase after this catalog is a structured review portal that collects expert feedback and routes it into an editorial, versioned update workflow rather than automatically mutating the benchmark.
