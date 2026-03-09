# Taxonomy

## Design goals

The public taxonomy is `MSC2020`-inspired but benchmark-oriented.

It should be:

- broad enough to represent major pure-math communities
- readable without consulting official MSC tables
- stable at the top level
- specific enough to support coverage accounting and gap analysis

## Three-level hierarchy

Each benchmark item receives one primary path:

1. `subject_family`
2. `subfield`
3. `finer_topic`

Each item may also include:

- `msc2020_codes`
- optional `secondary_tags`
- optional `cross_field_tags`

## Primary subject families

The initial benchmark uses the following subject families:

1. `logic_foundations`
2. `combinatorics_discrete`
3. `structural_algebra`
4. `number_theory_arithmetic_geometry`
5. `commutative_algebra_homological`
6. `representation_theory_noncommutative`
7. `algebraic_geometry`
8. `topology`
9. `differential_symplectic_geometry`
10. `analysis`
11. `functional_analysis_operator_theory`
12. `dynamics_math_physics_interface`

## Mapping philosophy

The benchmark does not expose the full complexity of `MSC2020` in its public-facing hierarchy.

Instead:

- public taxonomy labels remain human-readable
- official `MSC2020` mappings are stored as metadata
- multiple MSC codes may be attached to a single item
- one taxonomy path remains primary for coverage accounting

## Coverage expectations

For the seed release, each subject family should be represented by:

- at least `4` subfields
- at least `2` finer topics per subfield
- at least `2` benchmark items per finer topic

Cross-field items should still carry one primary taxonomy path, but may use secondary tags to reflect interdisciplinary structure.
