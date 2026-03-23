// Minimal state snapshot factory for observability lab

function createStateSnapshot(overrides = {}) {
  return {
    screen: overrides.screen,
    component: overrides.component,
    value: overrides.value,
    isAnimating: overrides.isAnimating
  };
}

module.exports = createStateSnapshot;
