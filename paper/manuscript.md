# Pure Math Benchmark: Toward a Community Standard for Research-Style Mathematical Evaluation

## Abstract

We propose `Pure Math Benchmark`, a public benchmark initiative for evaluating research-style pure mathematical reasoning in language models. Existing public math evaluations are valuable, but they are dominated by short-answer school mathematics, contest-style problem solving, undergraduate coursework coverage, or formal theorem-proving interfaces. None of these paradigms directly addresses broad, natural-language reasoning across modern pure mathematics as practiced by advanced graduate students, PhD researchers, postdocs, and faculty. We therefore propose a benchmark organized by an `MSC2020`-inspired hierarchy, built around expert-reviewed items, argument-centered scoring, structured provenance metadata, and explicit governance. The benchmark is designed not only as a dataset, but as a program: a public standard with correction, deprecation, editorial review, and community participation pathways. We release an initial seed corpus, a public taxonomy, a per-item schema, and a formal expert-review rubric. We invite mathematicians across subject areas to participate in review, critique, and scope-setting so that this benchmark can mature into a credible shared evaluation resource for mathematical language models.

## 1. Introduction

Language models now perform strongly on many public mathematics benchmarks. At the same time, the benchmark ecology for mathematics remains skewed toward tasks that are not adequate proxies for the practice of pure mathematics at research level. A system that performs well on grade-school arithmetic or olympiad-style final-answer tasks need not demonstrate the abilities that matter most to working mathematicians: selecting the right theorem, identifying a missing hypothesis, comparing two frameworks, constructing a counterexample, outlining a viable proof strategy, or making meaningful partial progress on a difficult mathematical question.

This project begins from the claim that `research-style pure mathematics` deserves its own evaluation standard. The aim is not to replace existing benchmarks, but to complement them with a benchmark whose unit of evaluation is the mathematical argument rather than only the final answer.

## 2. Why Existing Public Eval Sets Are Not Enough

Public math evaluation currently includes several successful families:

- school-level and general mathematical QA
- contest and olympiad benchmarks
- undergraduate subject benchmarks
- formal theorem-proving benchmarks
- a small number of emerging proof-oriented public benchmarks

These resources are valuable, but each leaves important gaps for advanced pure mathematics.

### 2.1 Final-answer bias

Many current benchmarks reward the correct endpoint more than the validity of the reasoning. In pure mathematics, this is often the wrong emphasis. A mathematically incorrect proof that lands on the right conclusion should not be treated as equivalent to a valid argument.

### 2.2 Contest bias

Competition mathematics is important and difficult, but it favors polished bounded tasks and trick-sensitive solutions. Research mathematics often involves theorem selection, reformulation, sensitivity to hypotheses, and long-horizon structural reasoning rather than the contest format.

### 2.3 Formal-interface mismatch

Formal theorem-proving benchmarks are indispensable for one capability regime, but they measure proof construction inside formal systems. That is not the same as evaluating natural-language mathematical reasoning as mathematicians currently practice it.

### 2.4 Subject imbalance

Even advanced public math benchmarks frequently overrepresent the areas that are easiest to package as public benchmark problems. Modern pure mathematics is much broader.

## 3. Benchmark Scope

`Pure Math Benchmark` focuses on:

- advanced graduate to expert-level pure mathematics
- natural-language reasoning and mathematical exposition
- broad subject coverage using an `MSC2020`-aware taxonomy
- expert-reviewed items with explicit provenance and contamination metadata

The benchmark does not aim to be:

- a generic STEM benchmark
- a contest-only benchmark
- an open-conjecture-solving benchmark
- a formal theorem-proving benchmark in disguise

## 4. Taxonomy

The benchmark uses a three-level hierarchy:

1. `subject_family`
2. `subfield`
3. `finer_topic`

This public taxonomy is inspired by `MSC2020` but made more readable for benchmark users. Each item is also mapped back to one or more official MSC codes.

The initial subject families are:

- Logic and Foundations
- Combinatorics and Discrete Structures
- General and Structural Algebra
- Number Theory and Arithmetic Geometry
- Commutative Algebra and Homological Methods
- Representation Theory and Noncommutative Algebra
- Algebraic Geometry
- Topology
- Differential and Symplectic Geometry
- Real, Complex, and Harmonic Analysis
- Functional Analysis and Operator Theory
- Dynamical Systems and Mathematical Physics Interface

## 5. Item Design

The benchmark includes research-style task types such as:

- theorem applicability
- proof strategy
- missing-hypothesis diagnosis
- construction and counterexample
- framework comparison
- invariant interpretation
- local-to-global reasoning

Each item carries structured metadata for taxonomy, provenance, review state, leakage assessment, and expected answer format.

## 6. Expert Review Rubric

We treat expert review as part of the benchmark definition, not merely as a post hoc annotation layer.

The review rubric tracks:

- main claim correctness
- logical validity
- use of hypotheses and definitions
- completeness
- proof strategy quality
- partial progress value
- communication clarity

Responses with fatal mathematical flaws should not be rewarded simply because they contain plausible terminology. Conversely, incomplete but mathematically meaningful progress should be distinguished from bluffing or filler.

## 7. Governance

If a benchmark is meant to become a standard, then governance must be part of the release architecture. We therefore include:

- a Steering Committee model
- an Editorial Board model
- conflict-of-interest rules
- correction and appeals procedures
- versioning rules for benchmark releases

This framework is designed to prevent the project from becoming an opaque personal dataset.

## 8. Seed Release

The present repository includes:

- a public benchmark charter
- comparison documents for the current benchmark landscape
- a benchmark taxonomy and MSC mapping policy
- item and review schemas
- a seed cross-subject corpus
- expert-review rubrics
- governance and participation documents

The seed release is intentionally modest. It is designed to establish standards before scale.

## 9. Invitation To The Mathematical Community

This project will only become useful as a standard if mathematicians help shape it.

We invite participation from:

- advanced PhD students
- postdoctoral researchers
- faculty
- subject-matter experts willing to review items
- researchers interested in rigorous evaluation design

We especially welcome criticism about:

- subject coverage
- item quality
- benchmark scope
- rubric clarity
- governance design

## 10. Feedback And Revision Loop

The project adopts a public revision loop:

1. release benchmark materials publicly
2. gather mathematical feedback through issues, discussions, and editorial channels
3. route substantive concerns through review and adjudication
4. publish corrections and release notes
5. revise the manuscript and benchmark artifacts accordingly

We view this loop as essential. A community standard in mathematics should improve through visible, mathematically serious critique.

## 11. Conclusion

`Pure Math Benchmark` is an attempt to create evaluation infrastructure that better matches the structure of pure mathematics as a research discipline. The benchmark is intentionally broader than contest math, more natural-language oriented than formal theorem proving, and more governance-aware than a one-off dataset release. We hope it can become a useful public instrument for evaluating mathematical language models, and we invite mathematicians to help determine whether it succeeds.
