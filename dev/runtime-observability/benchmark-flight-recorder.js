// Benchmark for flight-recorder.js (CommonJS)
const recorder = require('./flight-recorder');
const EVENTS = require('./runtime-events');

recorder.clearEvents();
const N = 10000;
const start = Date.now();
for (let i = 0; i < N; i++) {
  recorder.recordEvent(EVENTS.USER_EVENT, { action: 'noop', index: i });
}
const elapsed = Date.now() - start;
const total = recorder.getEvents().length;
console.log('Total events:', total);
console.log('Elapsed ms:', elapsed);
console.log('Avg events/ms:', (total / (elapsed || 1)).toFixed(2));
