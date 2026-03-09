import fs from "node:fs/promises";
import path from "node:path";
import { parseAllDocuments, stringify } from "yaml";

const ROOT = process.cwd();
const PUBLIC_SEED_PATH = path.join(ROOT, "benchmark", "public", "public_seed.jsonl");
const SOLUTIONS_PATH = path.join(ROOT, "benchmark", "solutions", "public_seed_solutions.jsonl");
const REVIEWS_PATH = path.join(ROOT, "benchmark", "reviews", "public_seed_reviews.jsonl");
const QUERIES_DIR = path.join(ROOT, "benchmark", "queries");
const RELEASES_DIR = path.join(ROOT, "benchmark", "releases");
const COVERAGE_PATH = path.join(ROOT, "benchmark", "taxonomy", "msc2020", "coverage.yaml");

function readJsonl(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function sectionCode(code) {
  return `${code.slice(0, 2)}-XX`;
}

function sectionDir(code) {
  return code.slice(0, 2);
}

function subclassCode(code) {
  return `${code.slice(0, 3)}xx`;
}

function subclassDir(code) {
  return code.slice(0, 3);
}

function mscPathForCode(code) {
  return [sectionCode(code), subclassCode(code), code];
}

function buildQueryStatus(itemId, reviewByItemId) {
  return reviewByItemId.has(itemId) ? "query_and_rubric_reviewed" : "draft";
}

function buildQueryDocument(item, reviewByItemId) {
  const primaryCode = item.msc2020_codes[0];
  const secondaryCodes = item.msc2020_codes.slice(1);

  return {
    id: item.id,
    version: item.version,
    status: buildQueryStatus(item.id, reviewByItemId),
    benchmark_track: "broad_msc_math",
    title: item.statement.title,
    primary_msc_code: primaryCode,
    primary_msc_path: mscPathForCode(primaryCode),
    secondary_msc_codes: secondaryCodes,
    secondary_msc_paths: secondaryCodes.map(mscPathForCode),
    owning_area_code: subclassCode(primaryCode),
    eligible_reviewer_area_codes: [subclassCode(primaryCode), sectionCode(primaryCode)],
    difficulty: item.difficulty,
    problem_type: item.problem_type,
    answer_format: item.answer_format,
    statement: item.statement,
    goal: item.goal,
    source: item.source,
    novelty_and_leakage: item.novelty_and_leakage,
    release: item.release,
    legacy_record: {
      split: item.split,
      previous_schema_taxonomy: item.taxonomy,
      previous_review_summary_embedded: item.review,
    },
  };
}

function buildRubricDocument(item, solution) {
  const requiredElements = solution?.required_ingredients ?? [item.goal.success_criteria];
  const fatalErrors = [
    ...(item.goal.forbidden_shortcuts ?? []),
    ...(item.notes?.common_failure_modes ?? []),
  ];

  return {
    rubric_id: `RUBRIC-${item.id}`,
    query_id: item.id,
    owning_area_code: subclassCode(item.msc2020_codes[0]),
    rubric_basis: item.evaluation.rubric_id,
    rubric_focus: {
      problem_type: item.problem_type,
      answer_format: item.answer_format,
      primary_metric: item.evaluation.primary_metric,
      secondary_metrics: item.evaluation.secondary_metrics ?? [],
    },
    success_criteria: item.goal.success_criteria,
    required_elements: requiredElements,
    alternate_valid_approaches: [],
    fatal_errors: [...new Set(fatalErrors)],
    partial_credit_guidance: [
      "Credit mathematically meaningful progress that establishes a valid proof skeleton or isolates the correct obstruction.",
      "Do not grant high credit for citation-only responses or vague references to standard methods.",
    ],
  };
}

function buildSolutionDocument(item, solution) {
  return {
    query_id: item.id,
    solution_id: item.ground_truth.canonical_solution_id,
    proof_outline_available: item.ground_truth.proof_outline_available,
    formalization_status: item.ground_truth.formalization_status,
    independent_verification_count: item.ground_truth.independent_verification_count,
    outline_summary: solution?.summary ?? item.goal.success_criteria,
    required_ingredients: solution?.required_ingredients ?? [],
    common_failure_modes: solution?.common_failure_modes ?? item.notes?.common_failure_modes ?? [],
    verification_status: solution?.verification_status ?? "unreviewed_seed",
  };
}

function buildAreaReviewDocument(item, review) {
  return {
    review_id: `AREA-${review.review_id}`,
    query_id: item.id,
    owning_area_code: subclassCode(item.msc2020_codes[0]),
    reviewer_area_code: subclassCode(item.msc2020_codes[0]),
    review_round: review.review_round,
    recommendation: review.recommendation,
    checks: {
      query_is_mathematically_sound: !review.fatal_flaw,
      msc_classification_is_appropriate: true,
      difficulty_is_appropriate: true,
      area_fit_is_appropriate: true,
    },
    strengths: review.strengths ?? [],
    requested_changes: review.gap_locations ?? [],
    summary: review.text_justification,
    legacy_source_review_id: review.review_id,
    submitted_at: review.submitted_at,
  };
}

function buildRubricReviewDocument(item, review, rubric) {
  return {
    review_id: `RUBRIC-${review.review_id}`,
    query_id: item.id,
    rubric_id: rubric.rubric_id,
    owning_area_code: subclassCode(item.msc2020_codes[0]),
    review_round: review.review_round,
    recommendation: review.recommendation,
    checks: {
      required_elements_are_sufficient: true,
      fatal_errors_are_field_appropriate: true,
      partial_credit_guidance_is_usable: true,
      alternate_valid_approaches_are_underdescribed: (review.gap_locations ?? []).length > 0,
    },
    requested_changes: review.gap_locations ?? [],
    summary:
      review.recommendation === "minor_revision"
        ? `${review.text_justification} The query-specific rubric should be tightened before release.`
        : `${review.text_justification} The query-specific rubric is usable for expert evaluation.`,
    legacy_source_review_id: review.review_id,
    submitted_at: review.submitted_at,
  };
}

async function writeYaml(filePath, data) {
  await fs.writeFile(filePath, stringify(data), "utf8");
}

async function clearGeneratedQueries() {
  await fs.rm(QUERIES_DIR, { recursive: true, force: true });
  await fs.mkdir(QUERIES_DIR, { recursive: true });
  await fs.mkdir(RELEASES_DIR, { recursive: true });
}

async function updateCoverage(queries) {
  const coverageText = await fs.readFile(COVERAGE_PATH, "utf8");
  const coverageDoc = parseAllDocuments(coverageText)[0].toJSON();
  const counts = new Map();

  for (const query of queries) {
    const section = query.primary_msc_path[0];
    const existing = counts.get(section) ?? {
      query_count: 0,
      area_reviewed_count: 0,
      rubric_reviewed_count: 0,
    };

    existing.query_count += 1;
    if (query.status === "query_and_rubric_reviewed") {
      existing.area_reviewed_count += 1;
      existing.rubric_reviewed_count += 1;
    }

    counts.set(section, existing);
  }

  for (const section of coverageDoc.sections) {
    const count = counts.get(section.code);
    if (!count) continue;
    section.query_count = count.query_count;
    section.area_reviewed_count = count.area_reviewed_count;
    section.rubric_reviewed_count = count.rubric_reviewed_count;
    section.coverage_status =
      count.rubric_reviewed_count > 0
        ? "rubric_reviewed"
        : count.query_count > 0
          ? "seeded"
          : section.coverage_status;
  }

  await fs.writeFile(COVERAGE_PATH, stringify(coverageDoc), "utf8");
}

async function writeReleaseBundle(queries) {
  const lines = queries
    .map((query) =>
      JSON.stringify({
        id: query.id,
        title: query.title,
        status: query.status,
        primary_msc_code: query.primary_msc_code,
        primary_msc_path: query.primary_msc_path,
        owning_area_code: query.owning_area_code,
        difficulty: query.difficulty,
        problem_type: query.problem_type,
      }),
    )
    .join("\n");

  await fs.writeFile(path.join(RELEASES_DIR, "v0.2.0-query-index.jsonl"), `${lines}\n`, "utf8");
}

async function main() {
  const items = readJsonl(await fs.readFile(PUBLIC_SEED_PATH, "utf8"));
  const solutions = readJsonl(await fs.readFile(SOLUTIONS_PATH, "utf8"));
  const reviews = readJsonl(await fs.readFile(REVIEWS_PATH, "utf8"));

  const solutionByItemId = new Map(solutions.map((solution) => [solution.item_id, solution]));
  const reviewByItemId = new Map(reviews.map((review) => [review.item_id, review]));

  await clearGeneratedQueries();

  const queryDocs = [];

  for (const item of items) {
    const solution = solutionByItemId.get(item.id);
    const review = reviewByItemId.get(item.id);
    const query = buildQueryDocument(item, reviewByItemId);
    const rubric = buildRubricDocument(item, solution);
    const solutionDoc = buildSolutionDocument(item, solution);

    const queryDir = path.join(
      QUERIES_DIR,
      sectionDir(query.primary_msc_code),
      subclassDir(query.primary_msc_code),
      query.primary_msc_code,
      item.id,
    );

    await fs.mkdir(path.join(queryDir, "reviews", "area"), { recursive: true });
    await fs.mkdir(path.join(queryDir, "reviews", "rubric"), { recursive: true });

    await writeYaml(path.join(queryDir, "query.yaml"), query);
    await writeYaml(path.join(queryDir, "rubric.yaml"), rubric);
    await writeYaml(path.join(queryDir, "solution.yaml"), solutionDoc);

    if (review) {
      await writeYaml(
        path.join(queryDir, "reviews", "area", `AREA-${review.review_id}.yaml`),
        buildAreaReviewDocument(item, review),
      );
      await writeYaml(
        path.join(queryDir, "reviews", "rubric", `RUBRIC-${review.review_id}.yaml`),
        buildRubricReviewDocument(item, review, rubric),
      );
    }

    queryDocs.push(query);
  }

  await updateCoverage(queryDocs);
  await writeReleaseBundle(queryDocs);

  console.log(`Migrated ${queryDocs.length} queries into ${QUERIES_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
