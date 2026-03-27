#!/usr/bin/env python3
import os
import json
import sys

_EVENTS_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), "janus_events.jsonl"))

def main():
    events = set()
    expected = set()
    if os.path.exists(_EVENTS_FILE):
        with open(_EVENTS_FILE, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    evt = json.loads(line)
                    if evt.get("type") == "trace" and "name" in evt:
                        events.add(evt["name"])
                    if evt.get("type") == "expect" and "name" in evt:
                        expected.add(evt["name"])
                except Exception:
                    pass
    found = events & expected
    missing = expected - events
    print("Janus Report")
    print(f"E+: {sorted(found)}")
    print(f"E-: {sorted(missing)}")
    ecr = (len(found) / len(expected) * 100) if expected else 100.0
    print(f"ECR: {ecr:.1f}%")
    if missing:
        print("Status: ⚠️ Missing expected events")
    else:
        print("Status: OK")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "report":
        main()
    else:
        print("Usage: janus report")
