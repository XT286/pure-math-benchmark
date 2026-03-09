# Scoring

## Philosophy

The benchmark now has three related but distinct review layers:

1. `query review`
2. `rubric review`
3. later, `model-answer evaluation`

These should not be conflated.

The scoring framework is designed to capture:

- whether the central mathematical claim is correct
- whether the reasoning is logically valid
- whether hypotheses and definitions are used properly
- whether important gaps remain
- whether the response makes meaningful progress even if incomplete

## Query review dimensions

Field experts reviewing a query should ask:

1. is the query mathematically sound
2. is it correctly classified in MSC
3. is it appropriate for the claimed level and area
4. is it precise enough for consistent evaluation

## Rubric review dimensions

Field experts reviewing a query rubric should ask:

1. does the rubric capture the required elements of a good answer
2. does it identify fatal errors correctly
3. does it allow legitimate alternate approaches
4. does it define partial-credit boundaries sensibly

## Model-answer evaluation dimensions

When the benchmark later evaluates model answers, each answer rubric may still use dimensions such as:

1. main claim correctness
2. logical validity
3. use of hypotheses and definitions
4. completeness
5. proof strategy quality
6. partial progress value
7. communication clarity

## Fatal flaws

For query or rubric review, some artifacts should fail regardless of their overall promise. Examples include:

- a mathematically unsound query
- a query that is badly misclassified for its area
- a rubric that would reject valid field-standard answers
- a rubric that fails to mark fatal mathematical mistakes

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

The benchmark should ingest expert opinion through structured review artifacts and editorial adjudication, not direct automatic mutation of the benchmark set.

Reported results should therefore include:

- query review recommendation
- rubric review recommendation
- requested changes
- adjudicated final disposition where relevant

## Feedback loop

The future review portal should collect structured reviewer feedback and route it into an editorial queue.

Accepted changes should then enter the benchmark through:

- adjudication
- versioned updates
- release notes

not through automatic direct write-back.
