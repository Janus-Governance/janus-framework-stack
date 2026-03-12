function buildEvidence({ requiredEvent, present }) {
  if (requiredEvent && !present) {
    return "E-";
  }
  return "E+";
}

module.exports = {
  buildEvidence,
};
