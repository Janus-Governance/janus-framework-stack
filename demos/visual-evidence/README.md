
# Visual Evidence Demo

This demo provides a minimal, reproducible workflow for screenshot-driven validation of Janus framework UI and evidence flows.

## Quick Start

1. **Install dependencies:**
	```sh
	npm install
	npm run install-playwright
	```

2. **Configure environment:**
	- Copy `.env.example` to `.env` and set your `OPENAI_API_KEY` if using vision analysis.
	- Optionally set `TARGET_URL` in `.env` to override the default (local index.html).

3. **Run the demo:**
	```sh
	node capture.js
	```

## What Happens
- Captures a screenshot of the target page (default: local `index.html`).
- Writes output artifacts to `output/`:
  - `screenshot.png`: Screenshot of the page
  - `last-run.json`: Metadata (timestamp, url, screenshot path)
  - `visual-analysis.json`: (if vision.js and API key are configured)

## Output Artifacts
- `output/screenshot.png`
- `output/last-run.json`
- `output/visual-analysis.json` (if vision analysis is enabled)

## Customizing the Target
- By default, the demo captures the local `index.html` using a file:// URL.
- To capture a different page, set `TARGET_URL` in your `.env` file.

## Playwright Browser Install
If running for the first time or on a new machine, run:
```sh
npm run install-playwright
```
This ensures Playwright's Chromium browser is available.

## Governance Note
- The screenshot is an evidence artifact, not an automatic resolution.
- Human visual validation is still required for governance and audit purposes.
