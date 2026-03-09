import fs from "node:fs/promises";
import path from "node:path";
import { parse, stringify } from "yaml";

const ROOT = process.cwd();
const TREE_PATH = path.join(ROOT, "benchmark", "taxonomy", "msc2020", "tree.yaml");
const COVERAGE_PATH = path.join(ROOT, "benchmark", "taxonomy", "msc2020", "coverage.yaml");
const QUERIES_DIR = path.join(ROOT, "benchmark", "queries");
const GENERATED_DIR = path.join(ROOT, "site", "src", "generated");

async function readYaml(filePath) {
  return parse(await fs.readFile(filePath, "utf8"));
}

async function listFiles(dir, suffix) {
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

function summarizeReview(filePath, data, type) {
  return {
    id: data.review_id,
    query_id: data.query_id,
    type,
    recommendation: data.recommendation,
    summary: data.summary,
    requested_changes: data.requested_changes ?? [],
    submitted_at: data.submitted_at,
    file_path: path.relative(ROOT, filePath),
  };
}

async function loadQueries() {
  const queryPaths = await listFiles(QUERIES_DIR, "query.yaml");
  const queries = [];
  const rubrics = [];
  const solutions = [];
  const reviews = [];

  for (const queryPath of queryPaths) {
    const queryDir = path.dirname(queryPath);
    const query = await readYaml(queryPath);
    const rubric = await readYaml(path.join(queryDir, "rubric.yaml"));
    const solution = await readYaml(path.join(queryDir, "solution.yaml"));
    const areaReviewPaths = await listFiles(path.join(queryDir, "reviews", "area"), ".yaml");
    const rubricReviewPaths = await listFiles(path.join(queryDir, "reviews", "rubric"), ".yaml");

    queries.push({
      ...query,
      file_path: path.relative(ROOT, queryPath),
      rubric_id: rubric.rubric_id,
      solution_id: solution.solution_id,
      review_counts: {
        area: areaReviewPaths.length,
        rubric: rubricReviewPaths.length,
      },
      review_status:
        areaReviewPaths.length > 0 && rubricReviewPaths.length > 0
          ? "query_and_rubric_reviewed"
          : areaReviewPaths.length > 0
            ? "query_reviewed"
            : "draft",
    });

    rubrics.push({
      ...rubric,
      file_path: path.relative(ROOT, path.join(queryDir, "rubric.yaml")),
    });

    solutions.push({
      ...solution,
      file_path: path.relative(ROOT, path.join(queryDir, "solution.yaml")),
    });

    for (const reviewPath of areaReviewPaths) {
      reviews.push(summarizeReview(reviewPath, await readYaml(reviewPath), "area"));
    }

    for (const reviewPath of rubricReviewPaths) {
      reviews.push(summarizeReview(reviewPath, await readYaml(reviewPath), "rubric"));
    }
  }

  queries.sort((a, b) => a.id.localeCompare(b.id));
  rubrics.sort((a, b) => a.rubric_id.localeCompare(b.rubric_id));
  solutions.sort((a, b) => a.solution_id.localeCompare(b.solution_id));
  reviews.sort((a, b) => a.id.localeCompare(b.id));

  return { queries, rubrics, solutions, reviews };
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
  const { queries, rubrics, solutions, reviews } = await loadQueries();
  const queryCountByCode = collectSectionQueryCounts(queries);
  const coverageByCode = indexBy(coverage.sections, "code");

  const nodes = tree.nodes.map((node) => ({
    ...node,
    query_count: queryCountByCode.get(node.code) ?? 0,
    coverage_status: coverageByCode.get(node.code)?.coverage_status ?? "open_for_seeding",
  }));

  const catalog = {
    generated_at: new Date().toISOString(),
    counts: {
      msc_nodes: tree.nodes.length,
      sections: tree.sections.length,
      queries: queries.length,
      rubrics: rubrics.length,
      reviewed_queries: queries.filter((query) => query.review_status === "query_and_rubric_reviewed").length,
    },
    nodes,
    sections: tree.sections.map((section) => ({
      code: section.code,
      short_code: section.short_code,
      label: section.label,
      query_count: queryCountByCode.get(section.code) ?? 0,
      coverage_status: coverageByCode.get(section.code)?.coverage_status ?? "open_for_seeding",
      child_codes: section.child_codes,
    })),
    queries,
    rubrics,
    solutions,
    reviews,
  };

  await fs.writeFile(path.join(GENERATED_DIR, "catalog.json"), JSON.stringify(catalog, null, 2));
  await fs.writeFile(path.join(GENERATED_DIR, "catalog.yaml"), stringify(catalog), "utf8");

  console.log(`Prepared catalog data in ${GENERATED_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
