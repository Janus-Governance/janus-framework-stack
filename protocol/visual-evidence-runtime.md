# Visual Evidence Runtime Protocol v1.0

## 1. Purpose

The Visual Evidence Runtime provides a reproducible, auditable process for generating and analyzing visual artifacts in the Janus framework. It enables automated capture, analysis, and reporting of visual evidence for baseline compliance and traceability.

## 2. Artifact Flow

The runtime produces and updates three core artifacts in a strict sequence:

1. **screenshot.png**  
   - Captured from the target environment as the primary visual input.

2. **last-run.json**  
   - Records execution metadata for the current run, including:
     - `timestamp`: ISO8601 string of execution time
     - `url`: Source or target URL (if applicable)
     - `screenshot`: Path to the captured screenshot file

3. **visual-analysis.json**  
   - Contains the results of automated visual analysis (see JSON contract below).

## 3. JSON Contract (visual-analysis.json)

`visual-analysis.json` must conform to the following contract:

```json
{
   "status": "success" | "error",
   "issues": [ "string" ],
   "confidence": "high" | "medium" | "low" | "unknown",
   "notes": "string"
}
```

- **status**: Indicates overall result (`success` or `error`).
- **issues**: Array of detected issues or anomalies (may be empty).
- **confidence**: String enum representing analysis certainty: `"high"`, `"medium"`, `"low"`, or `"unknown"`.
- **notes**: Freeform string for additional context or fallback explanations.

## 4. Invariants

- All three artifacts must be present after a successful run.
- If analysis fails, `visual-analysis.json` must still be written with `status: "error"` and a diagnostic `notes` message.
- `visual-analysis.json` is the only artifact for error or failure reporting.
- `last-run.json` is execution metadata only and must always reflect the actual execution, even on failure, including at minimum: `timestamp`, `url`, and `screenshot`.
- No artifact may be silently omitted or left in an inconsistent state.

## 5. Execution Requirements

- A `.env` file containing a valid `OPENAI_API_KEY` must be present in the runtime directory.
- The runtime must load environment variables using `dotenv` before any API calls.
- The runtime must not proceed if the API key is missing or invalid; errors must be reported in `visual-analysis.json` only.
- `last-run.json` must still record execution metadata even if analysis fails.

## 6. Scope

- This protocol covers only the baseline artifact flow and error handling.
- No governance, policy, or decision logic is included.
- Premium or advanced features are explicitly excluded.
