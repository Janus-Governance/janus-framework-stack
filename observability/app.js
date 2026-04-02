// Human Gate approval logic
window.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('approveBtn');
  if (btn) {
    btn.addEventListener('click', function() {
      var checks = document.querySelectorAll('.hg-check');
      var allChecked = Array.from(checks).every(function(c) { return c.checked; });
      if (!allChecked) {
        alert('Por favor, completa todas las validaciones.');
        return;
      }
      console.log('HUMAN_DECISION: APPROVED');
      const event = {
        type: 'HUMAN_DECISION',
        decision: 'APPROVED',
        ts: new Date().toISOString()
      };
      window.JANUS_EVENTS = window.JANUS_EVENTS || [];
      window.JANUS_EVENTS.push(event);
      window.RUNTIME_STATE = window.RUNTIME_STATE || {};
      window.RUNTIME_STATE.audit = window.RUNTIME_STATE.audit || [];
      window.RUNTIME_STATE.audit.push(event);
      // Update Events UI
      var eventsDiv = document.querySelector('.events');
      if (eventsDiv) {
        var events = [];
        if (Array.isArray(window.RUNTIME_STATE.audit)) events = events.concat(window.RUNTIME_STATE.audit);
        eventsDiv.innerHTML = '<h3>Eventos (AUDIT + MANAGEMENT)</h3>';
        eventsDiv.innerHTML += '<pre>' + JSON.stringify(events, null, 2) + '</pre>';
      }
    });
  }
});
// Janus Observability Layer v1
// Minimal, read-only, log-based observability

const app = document.getElementById('app');


const RUNTIMES = ["demo-node"];

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function loadRuntimes() {
  if (!RUNTIMES.length) {
    app.innerHTML = '<p>No se encontraron runtimes.</p>';
    return;
  }
  app.innerHTML = '';
  await Promise.all(RUNTIMES.map(renderRuntime));
}

async function renderRuntime(runtime) {
  const container = document.createElement('div');
  container.className = 'runtime';
  container.innerHTML = `<h2>Runtime: <code>${runtime}</code></h2>`;
  app.appendChild(container);

  // Load logs
  const base = `../runtimes/${runtime}/logs/`;
  const [audit, management, schema] = await Promise.all([
    fetchJSON(base + 'AUDIT_LOG.json'),
    fetchJSON(base + 'MANAGEMENT_LOG.json'),
    fetchJSON(base + 'SCHEMA_LOG.json'),
  ]);
  const schemaDiv = document.createElement('div');
  schemaDiv.className = 'schema';
  schemaDiv.innerHTML = '<h3>Schema</h3>';
  if (!schema) {
    schemaDiv.innerHTML += '<p class="error">No se pudo cargar SCHEMA_LOG.json</p>';
  }
  if (schema) {
    schemaDiv.innerHTML += '<pre>' + JSON.stringify(schema, null, 2) + '</pre>';
  }
  container.appendChild(schemaDiv);

  const eventsDiv = document.createElement('div');
  eventsDiv.className = 'events';
  eventsDiv.innerHTML = '<h3>Eventos (AUDIT + MANAGEMENT)</h3>';
  if (!audit && !management) {
    eventsDiv.innerHTML += '<p class="error">No se pudieron cargar los logs de eventos.</p>';
  } else {
    const events = [];
    if (Array.isArray(audit)) events.push(...audit);
    if (Array.isArray(management)) events.push(...management);
    events.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    if (events) {
      eventsDiv.innerHTML += '<pre>' + JSON.stringify(events, null, 2) + '</pre>';
    }
  }
  container.appendChild(eventsDiv);

  // Health (structural)
  const healthDiv = document.createElement('div');
  healthDiv.className = 'health';
  healthDiv.innerHTML = '<h3>Health estructural</h3>';
  const health = [];
  if (!audit) health.push('AUDIT_LOG.json ausente o inválido');
  if (!management) health.push('MANAGEMENT_LOG.json ausente o inválido');
  if (!schema) health.push('SCHEMA_LOG.json ausente o inválido');
  if (!health.length) health.push('OK');
  healthDiv.innerHTML += `<ul>${health.map(h => `<li>${h}</li>`).join('')}</ul>`;
  container.appendChild(healthDiv);
}

window.addEventListener('DOMContentLoaded', loadRuntimes);
