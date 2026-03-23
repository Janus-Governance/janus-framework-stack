// Functional test for flight-recorder.js (CommonJS)
const recorder = require('./flight-recorder');
const EVENTS = require('./runtime-events');
const createStateSnapshot = require('./runtime-state');

function fail(reason) {
  console.log('TEST FAIL: ' + reason);
  process.exit(1);
}

try {
  recorder.clearEvents();
  recorder.recordEvent(EVENTS.BUILD_INFO, { version: '1.0.0' });
  recorder.recordEvent(EVENTS.COMPONENT_MOUNT, { component: 'Widget' });
  recorder.recordEvent(EVENTS.USER_EVENT, { action: 'click', target: 'button' });
  recorder.recordEvent(EVENTS.STATE_TRANSITION, { from: 'idle', to: 'active' });
  const snap = createStateSnapshot({ screen: 'main', component: 'Widget', value: 42, isAnimating: false });
  recorder.recordEvent(EVENTS.STATE_SNAPSHOT, snap);
  recorder.recordEvent(EVENTS.JS_ERROR, { stack: 'stacktrace', file: 'app.js', line: 123 });

  const events = recorder.getEvents();
  if (events.length !== 6) fail('Expected 6 events, got ' + events.length);
  if (events[0].type !== EVENTS.BUILD_INFO) fail('First event is not BUILD_INFO');
  if (events[5].type !== EVENTS.JS_ERROR) fail('Last event is not JS_ERROR');
  const errors = recorder.getErrors();
  if (errors.length !== 1) fail('Expected 1 JS_ERROR event, got ' + errors.length);
  const errPayload = errors[0].payload;
  if (!errPayload.stack || !errPayload.file || typeof errPayload.line !== 'number' && typeof errPayload.line !== 'string') fail('JS_ERROR payload missing stack, file, or line');
  console.log('TEST PASS');
  process.exit(0);
} catch (e) {
  fail(e.message || e);
}
