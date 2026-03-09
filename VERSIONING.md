# Versioning

## Policy

The benchmark uses semantic-style versioning for public releases.

## Meaning of changes

- `major` version: incompatible benchmark policy changes, major taxonomy changes, or major scoring changes
- `minor` version: new accepted items, expanded subject coverage, new public rubric families
- `patch` version: metadata corrections, typo fixes, clarified notes, or non-semantic documentation updates

## Item stability

Accepted items should not be silently changed after release.

If an item changes materially, the repository should:

- document the change
- note the affected release
- preserve an audit trail

## Retractions and deprecations

- `deprecated` means mathematically sound but no longer active for standard evaluation
- `retracted` means materially flawed, compromised, or unsuitable for continued benchmark use

## Result reporting

Every reported benchmark result should cite:

- benchmark version
- tool regime
- model version
- date of evaluation
