import catalog from "../generated/catalog.json";

export function getCatalog() {
  return catalog;
}

export function getNodeByCode(code) {
  return catalog.nodes.find((node) => node.code === code);
}

export function getSectionByShortCode(shortCode) {
  return catalog.sections.find((section) => section.short_code === shortCode);
}

export function getChildren(node) {
  return node.child_codes.map((code) => getNodeByCode(code)).filter(Boolean);
}

export function getQueriesForCode(code) {
  return catalog.queries.filter((query) => query.primary_msc_path.includes(code));
}

export function getCandidateQueriesForCode(code) {
  return (catalog.candidate_queries ?? []).filter((query) => query.primary_msc_path.includes(code));
}

export function getAllQueriesForCode(code) {
  return [...getQueriesForCode(code), ...getCandidateQueriesForCode(code)];
}

export function getQueryById(id) {
  return catalog.queries.find((query) => query.id === id);
}

export function getCandidateQueryById(id) {
  return (catalog.candidate_queries ?? []).find((query) => query.id === id);
}

export function getRubricById(id) {
  return catalog.rubrics.find((rubric) => rubric.rubric_id === id);
}

export function getCandidateRubricByQueryId(queryId) {
  return (catalog.candidate_rubrics ?? []).find((rubric) => rubric.query_id === queryId);
}

export function getSolutionById(id) {
  return catalog.solutions.find((solution) => solution.solution_id === id);
}

export function getCandidateSolutionByQueryId(queryId) {
  return (catalog.candidate_solutions ?? []).find((solution) => solution.query_id === queryId);
}

export function getCandidateProvenanceByQueryId(queryId) {
  return (catalog.candidate_provenance ?? []).find((record) => record.query_id === queryId);
}

export function getReviewsForQuery(id) {
  return catalog.reviews.filter((review) => review.query_id === id);
}

export function shortSectionCode(code) {
  return code.slice(0, 2);
}

export function shortSubclassCode(code) {
  return code.slice(0, 3);
}
