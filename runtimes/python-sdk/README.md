# Janus Python SDK (v0.1)

Minimal append-only event logger for Janus governance demos.
No external dependencies.

---

## Quick Start

Run from repo root.

**Step 1 — Clear the log (required for a clean run):**

```sh
rm -f runtimes/python-sdk/janus/janus_events.jsonl
```

**Step 2 — Run the quickstart demo:**

```sh
python3 runtimes/python-sdk/quickstart.py
```

Expected output:

```
E+: ['event_ok']
E-: []
---
E+: ['event_ok']
E-: ['event_missing']
```

**Step 3 — View the governance report:**

```sh
python3 runtimes/python-sdk/janus/cli.py report
```

Expected output:

```
Janus Report
E+: ['event_ok']
E-: ['event_missing']
ECR: 50.0%
Status: ⚠️ Missing expected events
```

---

## Secondary example

`example.py` demonstrates additional SDK features: `@governed`, `report()`, and `human_decision()`.
Run it separately on a fresh log — do not mix it with the quickstart flow.

```sh
rm -f runtimes/python-sdk/janus/janus_events.jsonl
python3 runtimes/python-sdk/example.py
```

---

## Minimal usage

```python
import janus

janus.expect("hello")
janus.trace("hello")
janus.evaluate()
```
