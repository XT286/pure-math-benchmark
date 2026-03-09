import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { parse, stringify } from "yaml";

const ROOT = process.cwd();
const TREE_PATH = path.join(ROOT, "benchmark", "taxonomy", "msc2020", "tree.yaml");
const SOURCE_CATALOG_PATH = path.join(ROOT, "benchmark", "generation", "source_catalog.yaml");
const SEED_SPECS_PATH = path.join(ROOT, "benchmark", "generation", "section_seed_specs.yaml");
const OUTPUT_DIR = path.join(ROOT, "benchmark", "generated-candidates");

async function readYaml(filePath) {
  return parse(await fs.readFile(filePath, "utf8"));
}

async function writeYaml(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, stringify(value), "utf8");
}

function requireArray(value, message) {
  if (!Array.isArray(value)) {
    throw new Error(message);
  }
  return value;
}

function padIndex(index) {
  return String(index).padStart(4, "0");
}

function hashContent(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}

function buildNodeIndexes(tree) {
  const nodeByShortCode = new Map(tree.nodes.map((node) => [node.short_code, node]));
  const nodeByCode = new Map(tree.nodes.map((node) => [node.code, node]));
  return { nodeByShortCode, nodeByCode };
}

function buildPathForLeaf(leafCode, indexes) {
  const leaf = indexes.nodeByShortCode.get(leafCode);
  if (!leaf) {
    throw new Error(`Unknown MSC leaf code: ${leafCode}`);
  }
  if (leaf.level !== "leaf") {
    throw new Error(`MSC code ${leafCode} is not a leaf node`);
  }

  const subclass = indexes.nodeByCode.get(leaf.parent_code);
  if (!subclass) {
    throw new Error(`Missing subclass parent for ${leafCode}`);
  }

  const section = indexes.nodeByCode.get(subclass.parent_code);
  if (!section) {
    throw new Error(`Missing section parent for ${leafCode}`);
  }

  return { section, subclass, leaf };
}

function buildQueryDocument({ seed, source, queryId, pathInfo, itemHash }) {
  return {
    id: queryId,
    version: "0.0.0",
    status: "draft",
    benchmark_track: seed.benchmark_track ?? "broad_msc_math",
    title: seed.title,
    primary_msc_code: pathInfo.leaf.short_code,
    primary_msc_path: [pathInfo.section.code, pathInfo.subclass.code, pathInfo.leaf.code],
    secondary_msc_codes: seed.secondary_msc_codes ?? [],
    secondary_msc_paths: [],
    owning_area_code: pathInfo.subclass.code,
    owning_editor_id: "pending_assignment",
    eligible_reviewer_area_codes: [pathInfo.subclass.code, pathInfo.section.code],
    cross_area_owner_codes: seed.cross_area_owner_codes ?? [],
    difficulty: {
      stage: seed.difficulty_stage ?? "advanced_graduate",
      reviewer_score: seed.reviewer_score ?? 3,
    },
    problem_type: seed.problem_type ?? "theorem_applicability",
    answer_format: seed.answer_format ?? "proof_outline",
    statement: {
      title: seed.title,
      body: seed.statement_body,
      notation_conventions: seed.notation_conventions ?? [],
      definitions_included: seed.definitions_included ?? true,
      prerequisites_assumed: seed.prerequisites_assumed ?? [],
    },
    goal: {
      success_criteria: seed.success_criteria,
      forbidden_shortcuts: seed.forbidden_shortcuts ?? [
        "citation-only answer without explaining why the cited fact applies",
        "asserting the conclusion without identifying the governing theorem or construction",
      ],
    },
    source: {
      source_type: source.source_type,
      citation: source.citation,
      year: source.year,
      license_status: source.license_status,
      provenance_notes:
        seed.provenance_notes ??
        `Generated as a reference-grounded benchmark candidate from ${source.short_title}; pending area review.`,
    },
    novelty_and_leakage: {
      public_on_web: seed.public_on_web ?? "high",
      generated_by_model: true,
      contamination_risk: seed.contamination_risk ?? "medium",
      leakage_check_completed: false,
    },
    release: {
      first_release: "unreleased_candidate",
      item_hash: itemHash,
    },
    legacy_record: {
      split: "generated_candidate",
      previous_schema_taxonomy: {},
      previous_review_summary_embedded: {},
    },
  };
}

function buildRubricDocument({ seed, queryId, pathInfo, rubricId, source }) {
  return {
    rubric_id: rubricId,
    query_id: queryId,
    owning_area_code: pathInfo.subclass.code,
    rubric_basis: `Reference-grounded candidate rubric derived from ${source.short_title}.`,
    rubric_focus: {
      problem_type: seed.problem_type ?? "theorem_applicability",
      answer_format: seed.answer_format ?? "proof_outline",
      primary_metric: "mathematical correctness",
      secondary_metrics: [
        "correct theorem selection",
        "hypothesis handling",
        "clarity of proof architecture",
      ],
    },
    success_criteria: seed.success_criteria,
    required_elements: seed.required_elements ?? [],
    alternate_valid_approaches: seed.alternate_valid_approaches ?? [],
    fatal_errors: seed.fatal_errors ?? [],
    partial_credit_guidance:
      seed.partial_credit_guidance ?? [
        "award partial credit when the governing theorem is identified correctly but one justification step is incomplete",
        "award partial credit for a structurally correct proof outline that leaves only routine verification gaps",
      ],
  };
}

function buildSolutionDocument({ seed, queryId, solutionId }) {
  return {
    query_id: queryId,
    solution_id: solutionId,
    proof_outline_available: true,
    formalization_status: "none",
    independent_verification_count: 0,
    outline_summary: seed.outline_summary,
    required_ingredients: seed.required_ingredients ?? [],
    common_failure_modes: seed.common_failure_modes ?? [],
    verification_status: "reference_grounded_candidate",
  };
}

function buildProvenanceDocument({ seed, source, queryId, pathInfo }) {
  return {
    query_id: queryId,
    generation_method: "reference_grounded_seed_spec",
    source_id: source.id,
    source_citation: source.citation,
    source_scope_notes: source.scope_notes,
    msc_path: [pathInfo.section.short_code, pathInfo.subclass.short_code, pathInfo.leaf.short_code],
    adaptation_notes:
      seed.provenance_notes ??
      `Candidate adapted from a standard theorem-level fact in ${source.short_title}; explicit expert review required before promotion into benchmark/queries.`,
    review_gate: [
      "area expert must confirm the query statement is mathematically sound",
      "area expert must confirm the rubric accepts standard valid approaches",
      "editor must assess contamination and novelty before any release",
    ],
  };
}

async function resetOutputDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "README.md") {
      continue;
    }
    await fs.rm(path.join(dirPath, entry.name), { recursive: true, force: true });
  }
}

async function main() {
  const tree = await readYaml(TREE_PATH);
  const sourceCatalog = await readYaml(SOURCE_CATALOG_PATH);
  const seedBatch = await readYaml(SEED_SPECS_PATH);
  const indexes = buildNodeIndexes(tree);
  const sources = new Map(requireArray(sourceCatalog.sources, "source catalog must define a sources array").map((source) => [source.id, source]));
  const seeds = requireArray(seedBatch.seeds, "seed batch must define a seeds array");

  await resetOutputDir(OUTPUT_DIR);

  const manifest = {
    generated_at: new Date().toISOString(),
    generation_method: "reference_grounded_seed_spec",
    query_count: seeds.length,
    queries: [],
  };

  for (const [index, seed] of seeds.entries()) {
    const source = sources.get(seed.source_id);
    if (!source) {
      throw new Error(`Unknown source id for seed ${seed.title}: ${seed.source_id}`);
    }

    const pathInfo = buildPathForLeaf(seed.msc_code, indexes);
    const queryId = `PMB-CAND-2026-${padIndex(index + 1)}`;
    const rubricId = `RUB-CAND-${padIndex(index + 1)}`;
    const solutionId = `SOL-CAND-${padIndex(index + 1)}`;
    const dirPath = path.join(
      OUTPUT_DIR,
      pathInfo.section.short_code,
      pathInfo.subclass.short_code,
      pathInfo.leaf.short_code,
      queryId,
    );

    const itemHash = hashContent({ queryId, msc_code: seed.msc_code, title: seed.title, statement_body: seed.statement_body });
    const queryDocument = buildQueryDocument({ seed, source, queryId, pathInfo, itemHash });
    const rubricDocument = buildRubricDocument({ seed, queryId, pathInfo, rubricId, source });
    const solutionDocument = buildSolutionDocument({ seed, queryId, solutionId });
    const provenanceDocument = buildProvenanceDocument({ seed, source, queryId, pathInfo });

    await writeYaml(path.join(dirPath, "query.yaml"), queryDocument);
    await writeYaml(path.join(dirPath, "rubric.yaml"), rubricDocument);
    await writeYaml(path.join(dirPath, "solution.yaml"), solutionDocument);
    await writeYaml(path.join(dirPath, "provenance.yaml"), provenanceDocument);
    await fs.mkdir(path.join(dirPath, "reviews", "area"), { recursive: true });
    await fs.mkdir(path.join(dirPath, "reviews", "rubric"), { recursive: true });

    manifest.queries.push({
      id: queryId,
      title: seed.title,
      primary_msc_code: pathInfo.leaf.short_code,
      source_id: source.id,
      output_path: path.relative(ROOT, dirPath),
    });
  }

  await writeYaml(path.join(OUTPUT_DIR, "manifest.yaml"), manifest);
  console.log(`Generated ${manifest.query_count} reference-grounded candidate query packages in ${path.relative(ROOT, OUTPUT_DIR)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
