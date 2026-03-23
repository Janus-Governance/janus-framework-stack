// Stress test for flight-recorder.js (CommonJS)
const recorder = require('./flight-recorder');
const EVENTS = require('./runtime-events');

recorder.clearEvents();
const N = 100000;
let jsErrorCount = 0;
// Only use non-JS_ERROR event types for round-robin
const eventTypes = Object.values(EVENTS).filter(t => t !== EVENTS.JS_ERROR);
for (let i = 0; i < N; i++) {
  let type, payload;
  if (i > 0 && i % 10000 === 0) {
    type = EVENTS.JS_ERROR;
    payload = { stack: 'stacktrace', file: 'app.js', line: i };
    jsErrorCount++;
  } else {
    type = eventTypes[i % eventTypes.length];
    payload = { index: i };
  }
  recorder.recordEvent(type, payload);
}
const all = recorder.getEvents();
const errors = recorder.getErrors();
if (all.length !== N) {
  console.log('STRESS FAIL: Event count mismatch');
  process.exit(1);
}
if (errors.length !== jsErrorCount) {
  console.log('STRESS FAIL: JS_ERROR count mismatch');
  process.exit(1);
}
console.log('Total recorded events:', all.length);
console.log('Total JS_ERROR events:', errors.length);
console.log('Final in-memory event count:', all.length);
console.log('STRESS PASS');
process.exit(0);
