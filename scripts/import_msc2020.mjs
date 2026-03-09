import fs from "node:fs/promises";
import path from "node:path";
import { Parser } from "n3";
import { stringify } from "yaml";

const MSC_SKOS_URL =
  "https://raw.githubusercontent.com/TIBHannover/MSC2020_SKOS/main/msc-2020-suggestion4.ttl";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "benchmark", "taxonomy", "msc2020");
const TREE_PATH = path.join(OUTPUT_DIR, "tree.yaml");
const COVERAGE_PATH = path.join(OUTPUT_DIR, "coverage.yaml");
const LEGACY_ALIASES_PATH = path.join(ROOT, "benchmark", "taxonomy", "legacy_aliases.yaml");

const SKOS = {
  notation: "http://www.w3.org/2004/02/skos/core#notation",
  prefLabel: "http://www.w3.org/2004/02/skos/core#prefLabel",
  broader: "http://www.w3.org/2004/02/skos/core#broader",
  altLabel: "http://www.w3.org/2004/02/skos/core#altLabel",
};

const SECTION_LABEL_OVERRIDES = {
  "00-XX": "General and overarching topics; collections",
  "01-XX": "History and biography",
  "03-XX": "Mathematical logic and foundations",
  "05-XX": "Combinatorics",
  "06-XX": "Order, lattices, ordered algebraic structures",
  "08-XX": "General algebraic systems",
  "11-XX": "Number theory",
  "12-XX": "Field theory and polynomials",
  "13-XX": "Commutative algebra",
  "14-XX": "Algebraic geometry",
  "15-XX": "Linear and multilinear algebra; matrix theory",
  "16-XX": "Associative rings and algebras",
  "17-XX": "Nonassociative rings and algebras",
  "18-XX": "Category theory; homological algebra",
  "19-XX": "K-theory",
  "20-XX": "Group theory and generalizations",
  "22-XX": "Topological groups, Lie groups",
  "26-XX": "Real functions",
  "28-XX": "Measure and integration",
  "30-XX": "Functions of a complex variable",
  "31-XX": "Potential theory",
  "32-XX": "Several complex variables and analytic spaces",
  "33-XX": "Special functions",
  "34-XX": "Ordinary differential equations",
  "35-XX": "Partial differential equations",
  "37-XX": "Dynamical systems and ergodic theory",
  "39-XX": "Difference and functional equations",
  "40-XX": "Sequences, series, summability",
  "41-XX": "Approximations and expansions",
  "42-XX": "Harmonic analysis on Euclidean spaces",
  "43-XX": "Abstract harmonic analysis",
  "44-XX": "Integral transforms, operational calculus",
  "45-XX": "Integral equations",
  "46-XX": "Functional analysis",
  "47-XX": "Operator theory",
  "49-XX": "Calculus of variations and optimal control; optimization",
  "51-XX": "Geometry",
  "52-XX": "Convex and discrete geometry",
  "53-XX": "Differential geometry",
  "54-XX": "General topology",
  "55-XX": "Algebraic topology",
  "57-XX": "Manifolds and cell complexes",
  "58-XX": "Global analysis, analysis on manifolds",
  "60-XX": "Probability theory and stochastic processes",
  "62-XX": "Statistics",
  "65-XX": "Numerical analysis",
  "68-XX": "Computer science",
  "70-XX": "Mechanics of particles and systems",
  "74-XX": "Mechanics of deformable solids",
  "76-XX": "Fluid mechanics",
  "78-XX": "Optics, electromagnetic theory",
  "80-XX": "Classical thermodynamics, heat transfer",
  "81-XX": "Quantum theory",
  "82-XX": "Statistical mechanics, structure of matter",
  "83-XX": "Relativity and gravitational theory",
  "85-XX": "Astronomy and astrophysics",
  "86-XX": "Geophysics",
  "90-XX": "Operations research, mathematical programming",
  "91-XX": "Game theory, economics, finance, and other social and behavioral sciences",
  "92-XX": "Biology and other natural sciences",
  "93-XX": "Systems theory; control",
  "94-XX": "Information and communication theory, circuits",
  "97-XX": "Mathematics education",
};

function levelFromCode(code) {
  if (/^\d{2}-XX$/.test(code)) return "section";
  if (/^\d{2}[A-Z]xx$/.test(code)) return "subclass";
  if (/^\d{2}[A-Z]\d{2}$/.test(code)) return "leaf";
  return "other";
}

function shortCodeFromCode(code) {
  if (code.endsWith("-XX")) return code.slice(0, 2);
  if (code.endsWith("xx")) return code.slice(0, 3);
  return code;
}

function parentFromCode(code) {
  if (/^\d{2}[A-Z]xx$/.test(code)) {
    return `${code.slice(0, 2)}-XX`;
  }
  if (/^\d{2}[A-Z]\d{2}$/.test(code)) {
    return `${code.slice(0, 3)}xx`;
  }
  return null;
}

function sortByCode(a, b) {
  return a.code.localeCompare(b.code);
}

async function fetchTtl() {
  const response = await fetch(MSC_SKOS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch MSC data: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function buildNodes(ttlText) {
  const parser = new Parser();
  const quads = parser.parse(ttlText);
  const bySubject = new Map();

  for (const quad of quads) {
    const subject = quad.subject.value;
    const record = bySubject.get(subject) ?? {
      uri: subject,
      labels: [],
      altLabels: [],
      notations: [],
      broaders: [],
    };

    if (quad.predicate.value === SKOS.notation && quad.object.value) {
      record.notations.push(quad.object.value);
    } else if (quad.predicate.value === SKOS.prefLabel && quad.object.value) {
      record.labels.push(quad.object.value);
    } else if (quad.predicate.value === SKOS.altLabel && quad.object.value) {
      record.altLabels.push(quad.object.value);
    } else if (quad.predicate.value === SKOS.broader && quad.object.value) {
      record.broaders.push(quad.object.value);
    }

    bySubject.set(subject, record);
  }

  const nodes = new Map();
  const uriToCode = new Map();

  for (const record of bySubject.values()) {
    const notation = record.notations.find((value) => levelFromCode(value) !== "other");
    const label = record.labels[0];
    if (!notation || !label) {
      continue;
    }

    const node = {
      code: notation,
      short_code: shortCodeFromCode(notation),
      label: levelFromCode(notation) === "section" ? (SECTION_LABEL_OVERRIDES[notation] ?? label) : label,
      alt_labels: [...new Set(record.altLabels)].sort(),
      level: levelFromCode(notation),
      uri: record.uri,
      parent_code: null,
      child_codes: [],
      is_official: true,
    };

    nodes.set(node.code, node);
    uriToCode.set(record.uri, node.code);
  }

  for (const record of bySubject.values()) {
    const notation = record.notations.find((value) => nodes.has(value));
    if (!notation) continue;
    const node = nodes.get(notation);
    const broaderCode = record.broaders.map((uri) => uriToCode.get(uri)).find(Boolean);
    node.parent_code = broaderCode ?? parentFromCode(node.code);
  }

  for (const node of nodes.values()) {
    if (node.parent_code && nodes.has(node.parent_code)) {
      nodes.get(node.parent_code).child_codes.push(node.code);
    }
  }

  for (const node of nodes.values()) {
    node.child_codes.sort();
  }

  return nodes;
}

function buildTree(nodes) {
  const buildBranch = (code) => {
    const node = nodes.get(code);
    return {
      code: node.code,
      short_code: node.short_code,
      label: node.label,
      level: node.level,
      parent_code: node.parent_code,
      is_official: true,
      child_codes: node.child_codes,
      children: node.child_codes.map(buildBranch),
    };
  };

  const roots = [...nodes.values()]
    .filter((node) => node.level === "section")
    .sort(sortByCode)
    .map((node) => buildBranch(node.code));

  const allNodes = [...nodes.values()]
    .sort(sortByCode)
    .map((node) => ({
      code: node.code,
      short_code: node.short_code,
      label: node.label,
      level: node.level,
      parent_code: node.parent_code,
      is_official: true,
      child_codes: node.child_codes,
      alt_labels: node.alt_labels,
    }));

  return {
    metadata: {
      source: MSC_SKOS_URL,
      generated_at: new Date().toISOString(),
      description: "Official MSC2020 hierarchy imported from a public SKOS serialization.",
    },
    sections: roots,
    nodes: allNodes,
  };
}

function buildCoverage(nodes) {
  const sectionStatuses = [...nodes.values()]
    .filter((node) => node.level === "section")
    .sort(sortByCode)
    .map((node) => ({
      code: node.code,
      short_code: node.short_code,
      label: node.label,
      coverage_status: "open_for_seeding",
      query_count: 0,
      area_reviewed_count: 0,
      rubric_reviewed_count: 0,
      notes: "Coverage counts are updated from query sources during catalog preparation.",
    }));

  return {
    metadata: {
      generated_at: new Date().toISOString(),
      description: "Benchmark coverage registry keyed to official MSC2020 nodes.",
    },
    default_statuses: {
      open_for_seeding: "No accepted benchmark content yet, but the area is in scope.",
      seeded: "At least one query exists in the area.",
      area_reviewed: "At least one query in the area has passed area review.",
      rubric_reviewed: "At least one query in the area has passed rubric review.",
      released: "At least one query in the area has been released.",
    },
    sections: sectionStatuses,
  };
}

async function writeLegacyAliases() {
  const aliases = {
    metadata: {
      description:
        "Legacy mapping from the original benchmark-defined subject families to representative official MSC2020 sections.",
    },
    legacy_aliases: [
      { legacy_id: "logic_foundations", representative_msc_sections: ["03-XX"] },
      { legacy_id: "combinatorics_discrete", representative_msc_sections: ["05-XX", "52-XX"] },
      { legacy_id: "structural_algebra", representative_msc_sections: ["06-XX", "08-XX", "12-XX", "20-XX"] },
      { legacy_id: "number_theory_arithmetic_geometry", representative_msc_sections: ["11-XX", "14-XX"] },
      { legacy_id: "commutative_algebra_homological", representative_msc_sections: ["13-XX", "18-XX", "19-XX"] },
      { legacy_id: "representation_theory_noncommutative", representative_msc_sections: ["16-XX", "17-XX", "20-XX", "22-XX"] },
      { legacy_id: "algebraic_geometry", representative_msc_sections: ["14-XX"] },
      { legacy_id: "topology", representative_msc_sections: ["54-XX", "55-XX", "57-XX"] },
      { legacy_id: "differential_symplectic_geometry", representative_msc_sections: ["32-XX", "53-XX", "58-XX"] },
      { legacy_id: "analysis", representative_msc_sections: ["26-XX", "28-XX", "30-XX", "31-XX", "32-XX", "42-XX", "43-XX"] },
      { legacy_id: "functional_analysis_operator_theory", representative_msc_sections: ["46-XX", "47-XX"] },
      { legacy_id: "dynamics_math_physics_interface", representative_msc_sections: ["37-XX", "70-XX", "81-XX", "82-XX"] },
    ],
  };

  await fs.writeFile(LEGACY_ALIASES_PATH, stringify(aliases), "utf8");
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const ttlText = await fetchTtl();
  const nodes = buildNodes(ttlText);
  const tree = buildTree(nodes);
  const coverage = buildCoverage(nodes);

  await fs.writeFile(TREE_PATH, stringify(tree), "utf8");
  await fs.writeFile(COVERAGE_PATH, stringify(coverage), "utf8");
  await writeLegacyAliases();

  console.log(`Wrote ${TREE_PATH}`);
  console.log(`Wrote ${COVERAGE_PATH}`);
  console.log(`Imported ${tree.nodes.length} MSC nodes`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
