# Public Catalog

This directory contains the public static website for the benchmark.

## Purpose

The catalog is the expert-facing browse layer. It should let mathematicians:

- navigate directly to their MSC field
- inspect visible benchmark queries
- inspect the answer rubric for each query
- understand how to participate

## Build

From the repository root:

```sh
npm run catalog:prepare
npm run site:build
```

The current site is intentionally static. A later review portal can be added without changing the query source-of-truth files.
