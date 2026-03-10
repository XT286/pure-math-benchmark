import fs from "node:fs/promises";
import path from "node:path";
import { parse, stringify } from "yaml";

const ROOT = process.cwd();
const TREE_PATH = path.join(ROOT, "benchmark", "taxonomy", "msc2020", "tree.yaml");
const COVERAGE_PATH = path.join(ROOT, "benchmark", "taxonomy", "msc2020", "coverage.yaml");
const CANONICAL_QUERIES_DIR = path.join(ROOT, "benchmark", "queries");
const CANDIDATE_QUERIES_DIR = path.join(ROOT, "benchmark", "generated-candidates");
const GENERATED_DIR = path.join(ROOT, "site", "src", "generated");

async function readYaml(filePath) {
  return parse(await fs.readFile(filePath, "utf8"));
}

async function listFiles(dir, suffix) {
  try {
    await fs.access(dir);
  } catch {
    return [];
  }
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await listFiles(fullPath, suffix)));
    } else if (entry.isFile() && fullPath.endsWith(suffix)) {
      results.push(fullPath);
    }
  }
  return results;
}

function indexBy(items, key) {
  return new Map(items.map((item) => [item[key], item]));
}

function summarizeReview(filePath, data, type, layer) {
  return {
    id: data.review_id,
    query_id: data.query_id,
    type,
    layer,
    recommendation: data.recommendation,
    summary: data.summary,
    requested_changes: data.requested_changes ?? [],
    submitted_at: data.submitted_at,
    file_path: path.relative(ROOT, filePath),
  };
}

function routePathForLayer(layer, queryId) {
  return layer === "candidate" ? `/candidates/${queryId}/` : `/queries/${queryId}/`;
}

async function loadQueryPackages(rootDir, layer) {
  const queryPaths = await listFiles(rootDir, "query.yaml");
  const queries = [];
  const rubrics = [];
  const solutions = [];
  const provenanceRecords = [];
  const reviews = [];

  for (const queryPath of queryPaths) {
    const queryDir = path.dirname(queryPath);
    const query = await readYaml(queryPath);
    const rubric = await readYaml(path.join(queryDir, "rubric.yaml"));
    const solution = await readYaml(path.join(queryDir, "solution.yaml"));
    const provenancePath = path.join(queryDir, "provenance.yaml");
    const provenance = (await listFiles(queryDir, "provenance.yaml")).length > 0 ? await readYaml(provenancePath) : null;
    const areaReviewPaths = await listFiles(path.join(queryDir, "reviews", "area"), ".yaml");
    const rubricReviewPaths = await listFiles(path.join(queryDir, "reviews", "rubric"), ".yaml");
    const reviewStatus =
      layer === "candidate"
        ? "candidate_unreviewed"
        : areaReviewPaths.length > 0 && rubricReviewPaths.length > 0
          ? "query_and_rubric_reviewed"
          : areaReviewPaths.length > 0
            ? "query_reviewed"
            : "draft";

    queries.push({
      ...query,
      catalog_layer: layer,
      file_path: path.relative(ROOT, queryPath),
      route_path: routePathForLayer(layer, query.id),
      rubric_id: rubric.rubric_id,
      solution_id: solution.solution_id,
      review_counts: {
        area: areaReviewPaths.length,
        rubric: rubricReviewPaths.length,
      },
      review_status: reviewStatus,
    });

    rubrics.push({
      ...rubric,
      catalog_layer: layer,
      file_path: path.relative(ROOT, path.join(queryDir, "rubric.yaml")),
      route_path: layer === "candidate" ? `/candidates/${query.id}/` : `/rubrics/${rubric.rubric_id}/`,
    });

    solutions.push({
      ...solution,
      catalog_layer: layer,
      file_path: path.relative(ROOT, path.join(queryDir, "solution.yaml")),
    });

    if (provenance) {
      provenanceRecords.push({
        ...provenance,
        catalog_layer: layer,
        file_path: path.relative(ROOT, provenancePath),
      });
    }

    for (const reviewPath of areaReviewPaths) {
      reviews.push(summarizeReview(reviewPath, await readYaml(reviewPath), "area", layer));
    }

    for (const reviewPath of rubricReviewPaths) {
      reviews.push(summarizeReview(reviewPath, await readYaml(reviewPath), "rubric", layer));
    }
  }

  queries.sort((a, b) => a.id.localeCompare(b.id));
  rubrics.sort((a, b) => a.rubric_id.localeCompare(b.rubric_id));
  solutions.sort((a, b) => a.solution_id.localeCompare(b.solution_id));
  provenanceRecords.sort((a, b) => a.query_id.localeCompare(b.query_id));
  reviews.sort((a, b) => a.id.localeCompare(b.id));

  return { queries, rubrics, solutions, provenanceRecords, reviews };
}

function collectSectionQueryCounts(queries) {
  const counts = new Map();
  for (const query of queries) {
    const sectionCode = query.primary_msc_path[0];
    const subclassCode = query.primary_msc_path[1];
    const leafCode = query.primary_msc_path[2];

    for (const code of [sectionCode, subclassCode, leafCode]) {
      counts.set(code, (counts.get(code) ?? 0) + 1);
    }
  }
  return counts;
}

async function main() {
  await fs.mkdir(GENERATED_DIR, { recursive: true });

  const tree = await readYaml(TREE_PATH);
  const coverage = await readYaml(COVERAGE_PATH);
  const canonical = await loadQueryPackages(CANONICAL_QUERIES_DIR, "canonical");
  const candidate = await loadQueryPackages(CANDIDATE_QUERIES_DIR, "candidate");
  const queryCountByCode = collectSectionQueryCounts(canonical.queries);
  const candidateCountByCode = collectSectionQueryCounts(candidate.queries);
  const coverageByCode = indexBy(coverage.sections, "code");

  const nodes = tree.nodes.map((node) => ({
    ...node,
    query_count: queryCountByCode.get(node.code) ?? 0,
    canonical_query_count: queryCountByCode.get(node.code) ?? 0,
    candidate_query_count: candidateCountByCode.get(node.code) ?? 0,
    total_query_count: (queryCountByCode.get(node.code) ?? 0) + (candidateCountByCode.get(node.code) ?? 0),
    coverage_status: coverageByCode.get(node.code)?.coverage_status ?? "open_for_seeding",
  }));

  const catalog = {
    generated_at: new Date().toISOString(),
    counts: {
      msc_nodes: tree.nodes.length,
      sections: tree.sections.length,
      queries: canonical.queries.length,
      rubrics: canonical.rubrics.length,
      reviewed_queries: canonical.queries.filter((query) => query.review_status === "query_and_rubric_reviewed").length,
      canonical_queries: canonical.queries.length,
      canonical_rubrics: canonical.rubrics.length,
      candidate_queries: candidate.queries.length,
      candidate_rubrics: candidate.rubrics.length,
      total_visible_queries: canonical.queries.length + candidate.queries.length,
    },
    nodes,
    sections: tree.sections.map((section) => ({
      code: section.code,
      short_code: section.short_code,
      label: section.label,
      query_count: queryCountByCode.get(section.code) ?? 0,
      canonical_query_count: queryCountByCode.get(section.code) ?? 0,
      candidate_query_count: candidateCountByCode.get(section.code) ?? 0,
      total_query_count: (queryCountByCode.get(section.code) ?? 0) + (candidateCountByCode.get(section.code) ?? 0),
      coverage_status: coverageByCode.get(section.code)?.coverage_status ?? "open_for_seeding",
      child_codes: section.child_codes,
    })),
    queries: canonical.queries,
    rubrics: canonical.rubrics,
    solutions: canonical.solutions,
    reviews: canonical.reviews,
    candidate_queries: candidate.queries,
    candidate_rubrics: candidate.rubrics,
    candidate_solutions: candidate.solutions,
    candidate_provenance: candidate.provenanceRecords,
    candidate_reviews: candidate.reviews,
    all_queries: [...canonical.queries, ...candidate.queries].sort((a, b) => a.id.localeCompare(b.id)),
  };

  await fs.writeFile(path.join(GENERATED_DIR, "catalog.json"), JSON.stringify(catalog, null, 2));
  await fs.writeFile(path.join(GENERATED_DIR, "catalog.yaml"), stringify(catalog), "utf8");

  console.log(`Prepared catalog data in ${GENERATED_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
