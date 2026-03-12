function pad3(numberValue) {
  return String(numberValue).padStart(3, "0");
}

function nextId(prefix, existingCount) {
  return `${prefix}-${pad3(existingCount + 1)}`;
}

module.exports = {
  nextId,
};
