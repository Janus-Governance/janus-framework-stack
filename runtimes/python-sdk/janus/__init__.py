import json
import os
from datetime import datetime

_EVENTS_FILE = os.path.join(os.path.dirname(__file__), "janus_events.jsonl")
_EXPECTED_EVENTS = []


def trace(name, payload=None):
    """Append a trace event with optional payload."""
    event = {
        "type": "trace",
        "name": name,
        "payload": payload,
        "ts": datetime.utcnow().isoformat() + "Z"
    }
    with open(_EVENTS_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(event) + "\n")


def expect(name):
    """Register an expected event in memory and in janus_events.jsonl."""
    _EXPECTED_EVENTS.append(name)
    event = {
        "type": "expect",
        "name": name,
        "ts": datetime.utcnow().isoformat() + "Z"
    }
    with open(_EVENTS_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(event) + "\n")


def evaluate():
    """Compare recorded events against expected ones. Print E+ and E-."""
    events = set()
    expected = set()
    already_detected = set()
    if os.path.exists(_EVENTS_FILE):
        with open(_EVENTS_FILE, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    evt = json.loads(line)
                    if evt.get("type") == "trace" and "name" in evt:
                        events.add(evt["name"])
                    if evt.get("type") == "expect" and "name" in evt:
                        expected.add(evt["name"])
                    if evt.get("type") == "governance" and evt.get("name") == "OMISSION_DETECTED" and "expected" in evt:
                        already_detected.add(evt["expected"])
                except Exception:
                    pass
    found = events & expected
    missing = expected - events
    print(f"E+: {sorted(found)}")
    print(f"E-: {sorted(missing)}")
    if missing:
        with open(_EVENTS_FILE, "a", encoding="utf-8") as f:
            for evt in sorted(missing):
                if evt in already_detected:
                    continue
                omission_event = {
                    "type": "governance",
                    "name": "OMISSION_DETECTED",
                    "expected": evt,
                    "ts": datetime.utcnow().isoformat() + "Z"
                }
                f.write(json.dumps(omission_event) + "\n")


def human_decision(decision, rationale):
    """Write a HUMAN_DECISION governance event to janus_events.jsonl."""
    event = {
        "type": "governance",
        "name": "HUMAN_DECISION",
        "decision": decision,
        "rationale": rationale,
        "ts": datetime.utcnow().isoformat() + "Z"
    }
    with open(_EVENTS_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(event) + "\n")


def report():
    """Return all events as a list of dicts."""
    events = []
    if os.path.exists(_EVENTS_FILE):
        with open(_EVENTS_FILE, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    events.append(json.loads(line))
                except Exception:
                    pass
    return events


def governed(func):
    """Decorator to trace function entry and exit as governed events."""
    def wrapper(*args, **kwargs):
        trace("governed_entry", {"function": func.__name__})
        result = func(*args, **kwargs)
        trace("governed_exit", {"function": func.__name__})
        return result
    return wrapper
