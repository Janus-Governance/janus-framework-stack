// Minimal in-memory flight recorder for observability lab
const RUNTIME_EVENTS = require('./runtime-events');

let _events = [];

function recordEvent(type, payload) {
  _events.push({
    type,
    timestamp: Date.now(),
    payload
  });
}

function getEvents() {
  return _events.slice();
}

function getErrors() {
  return _events.filter(e => e.type === RUNTIME_EVENTS.JS_ERROR);
}

function clearEvents() {
  _events = [];
}

module.exports = {
  recordEvent,
  getEvents,
  getErrors,
  clearEvents
};
