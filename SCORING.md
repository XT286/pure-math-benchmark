# Scoring

## Philosophy

`Pure Math Benchmark` scores mathematical responses primarily as `arguments`, not just as final answers.

The scoring framework is designed to capture:

- whether the central mathematical claim is correct
- whether the reasoning is logically valid
- whether hypotheses and definitions are used properly
- whether important gaps remain
- whether the response makes meaningful progress even if incomplete

## Default rubric dimensions

Each review record should evaluate the following dimensions on a bounded scale:

1. main claim correctness
2. logical validity
3. use of hypotheses and definitions
4. completeness
5. proof strategy quality
6. partial progress value
7. communication clarity

## Fatal flaws

Some responses should fail regardless of partial strengths. Examples include:

- a false main conclusion
- circular reasoning
- application of a theorem without required hypotheses
- a decisive gap at the core of the argument

## Partial progress

Partial progress matters when it is mathematically genuine.

Examples of valuable partial progress include:

- identifying the correct theorem but not completing the final reduction
- constructing the right intermediate object
- isolating the precise missing hypothesis
- giving a correct proof skeleton with a local gap

Examples that should not score as meaningful partial progress include:

- bluffing with theorem names
- vague gestures toward standard methods
- generic mathematical filler that does not advance the stated task

## Aggregation

The seed release uses `structured expert judgment` rather than a single automatic scalar score.

Reported results should therefore include:

- dimension-level scores
- fatal-flaw status
- overall reviewer recommendation
- adjudicated final disposition where relevant

## Future automation

Automation may later assist with:

- format validation
- rubric consistency checks
- coarse triage

But the core correctness judgments for advanced pure mathematics should remain expert-led unless a validated alternative is demonstrated.
