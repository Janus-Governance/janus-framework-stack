// Canonical EvidenceRecord definition for Janus (shared)
/**
 * @typedef {Object} EvidenceRecord
 * @property {"E+"|"E-"} type - Canonical evidence type (E+ for positive, E- for negative)
 * @property {string} description - Human-readable description of the evidence
 * @property {string} [hash] - Optional hash for evidence integrity
 */

/**
 * @type {EvidenceRecord}
 * Example: { type: "E+", description: "All required events present", hash: "..." }
 */

// Export for both JS and TS consumers
module.exports = {};
