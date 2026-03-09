# Paper Assets

This directory contains:

- `main.tex`: the `arXiv`-ready LaTeX manuscript
- `references.bib`: bibliography for the manuscript
- `manuscript.md`: the plain-text source draft

Suggested compile sequence:

```sh
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

The Markdown file is retained as an editable prose source, while `main.tex` is the publication-facing version.
