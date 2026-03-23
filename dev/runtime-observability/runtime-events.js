// Canonical runtime event types for observability lab
// JS_ERROR payload must include: stack, file, line

const RUNTIME_EVENTS = {
  BUILD_INFO: 'BUILD_INFO',
  COMPONENT_MOUNT: 'COMPONENT_MOUNT',
  USER_EVENT: 'USER_EVENT',
  STATE_TRANSITION: 'STATE_TRANSITION',
  JS_ERROR: 'JS_ERROR', // Payload: { stack, file, line }
  STATE_SNAPSHOT: 'STATE_SNAPSHOT'
};

module.exports = RUNTIME_EVENTS;
