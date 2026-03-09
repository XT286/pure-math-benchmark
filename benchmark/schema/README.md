# Schema

The schema layer makes the benchmark auditable.

## Files

- `item.schema.json` defines benchmark items
- `review.schema.json` defines expert review records

## Design goals

- preserve mathematical provenance
- separate item content from review state
- support versioned releases
- make review and adjudication traceable

## Workflow states

Typical item lifecycle:

1. `draft`
2. `under_review`
3. `accepted`
4. `deprecated` or `retracted`

Each accepted item should have:

- a stable item ID
- a canonical release version
- one primary taxonomy path
- at least one expert review record
- an adjudicated disposition
