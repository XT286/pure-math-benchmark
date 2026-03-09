# Benchmark Landscape

## Overview

Public math evaluation is already rich, but the dominant benchmark categories measure different capability envelopes from the one targeted here.

`Pure Math Benchmark` is intended for `research-style pure mathematical reasoning` in natural language. Its niche is defined partly by what existing public eval sets do well and partly by what they do not attempt to measure.

## Existing benchmark families

### Grade-school and general math QA

Representative examples include `GSM8K` and related school-level reasoning datasets.

These benchmarks are useful for:

- arithmetic reasoning
- short multi-step derivations
- word-problem solving

They are not designed for:

- high-abstraction mathematical language
- theorem selection in advanced subjects
- proof architecture
- expert review of long-form arguments

### Contest and olympiad-style benchmarks

Representative examples include `MATH`, `AIME`-style collections, `OlympiadBench`, and `Omni-MATH`.

These benchmarks are useful for:

- difficult bounded problems
- clever transformations and competition problem solving
- strong final-answer discrimination at higher difficulty

Their limitations for research-style pure math evaluation include:

- heavy dependence on competition format
- frequent emphasis on short polished solutions
- high reliance on final-answer correctness
- limited alignment with the workflow of actual mathematical research

### Undergraduate subject benchmarks

Representative examples include university-level math subject benchmarks such as `UGMathBench`.

These benchmarks are useful for:

- curricular breadth
- topic coverage across core courses
- educational evaluation

Their limitations for this project include:

- a lower abstraction ceiling than many research topics
- emphasis on coursework mastery rather than expert-level mathematical judgment

### Formal theorem-proving benchmarks

Representative examples include `miniF2F` and related formal mathematics benchmarks.

These benchmarks are useful for:

- exact formal correctness
- proof assistant interaction
- theorem proving under explicit formal syntax

They are not substitutes for this project because:

- they measure `formalization ability` as well as reasoning ability
- they do not directly evaluate natural-language mathematical exposition
- the interface and constraints differ from how most mathematicians currently work day to day

### Emerging proof-oriented public benchmarks

A small number of newer public benchmarks move closer to proof evaluation and higher-level mathematical reasoning.

These efforts are important, but they still tend to be limited by one or more of:

- narrow subject coverage
- insufficient governance and review structure
- small scale
- limited explicit mapping to the breadth of modern pure mathematics

## The gap this project is meant to fill

The benchmark gap targeted by `Pure Math Benchmark` is the lack of a public, community-facing evaluation set that is simultaneously:

- broad across pure mathematics
- organized in an `MSC2020`-aware way
- centered on `argument quality` rather than only final answers
- explicitly reviewed by mathematicians
- designed for versioned correction, deprecation, and long-term governance

## Differentiators

This project differentiates itself by design:

1. `MSC-aware coverage`
   The benchmark is organized by subject family, subfield, and finer topic, with explicit mapping to official mathematical classification.

2. `Research-style task design`
   Items focus on proof strategy, theorem applicability, missing hypotheses, constructions, counterexamples, and cross-field reasoning.

3. `Expert-review rubric`
   Benchmark evaluation is based on structured expert judgment about correctness, rigor, gap severity, and partial progress.

4. `Governance and release discipline`
   The project includes conflict-of-interest rules, correction policies, and versioned releases from the start.

5. `Community participation`
   The benchmark is intended to be shaped by mathematicians through review, critique, and editorial oversight.

## Fair comparison principles

The benchmark should compare itself to other public eval sets accurately and without dismissiveness.

The correct framing is:

- existing benchmarks often solve different problems well
- those benchmarks remain valuable
- this project addresses a different evaluation need
- meaningful benchmark ecology requires multiple complementary evaluation types

## Implications for the repository and manuscript

The repository and manuscript should therefore:

- include a concise public comparison table
- state the benchmark niche without overstating novelty
- describe how this project complements both contest-style and formal-proof evaluations
- explain why research-style pure mathematics needs a dedicated benchmark program
