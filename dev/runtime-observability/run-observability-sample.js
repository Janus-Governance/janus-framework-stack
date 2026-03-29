// Minimal deterministic observability wrapper for demo/screenshot
const recorder = require('./flight-recorder');
const EVENTS = require('./runtime-events');
const createStateSnapshot = require('./runtime-state');

recorder.clearEvents();

recorder.recordEvent(EVENTS.BUILD_INFO, { version: '1.0.0', env: 'demo' });
recorder.recordEvent(EVENTS.COMPONENT_MOUNT, { component: 'DemoWidget' });
recorder.recordEvent(EVENTS.USER_EVENT, { action: 'click', target: 'start-btn' });
recorder.recordEvent(EVENTS.STATE_TRANSITION, { from: 'idle', to: 'running' });
recorder.recordEvent(EVENTS.STATE_SNAPSHOT, createStateSnapshot({ screen: 'main', component: 'DemoWidget', value: 7, isAnimating: false }));
recorder.recordEvent(EVENTS.JS_ERROR, { stack: 'Error: demo\n    at DemoWidget', file: 'demo.js', line: 42 });

const events = recorder.getEvents();
console.log(JSON.stringify(events, null, 2));
