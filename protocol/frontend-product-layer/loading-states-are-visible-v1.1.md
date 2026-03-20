# Loading States Are Visible — v1.1

## Description
This protocol states that, within the Frontend Product Layer, any operation that requires waiting must expose a visible loading state to the user.

## Problem it solves
It prevents uncertainty, repeated actions, and loss of trust caused by silent processing or delayed system response without feedback.

## Rule
Any user-triggered or system-triggered operation that takes enough time to be perceptible must present a visible loading state. Waiting without visible feedback is non-compliant.

## Operational definition

- **Loading state:**  
  Any visible indicator that the system is processing, fetching, submitting, or preparing a result.

- **Perceptible wait:**  
  Any delay long enough for a user to question whether the system responded.  
  As a reference threshold, any operation exceeding 300ms should be considered perceptible. Exact threshold may be declared in the deployment runbook.

- **Visible feedback:**  
  Any interface signal such as spinner, progress bar, skeleton state, disabled button with status text, or equivalent clear indicator.  
  An equivalent indicator must be immediately recognizable as a waiting signal without prior knowledge of the system.

## Practical application

If a form submission takes time, the submit button must show a loading or disabled state.  
If a page or section is fetching data, the interface must expose a spinner, skeleton, or status indicator.  
If content is delayed, the user must understand that the system is working rather than frozen.  
If the system polls for updates or synchronizes data automatically, the interface must expose a visible indicator if the operation is perceptible to the user.

## Notes

- This protocol applies only within the Frontend Product Layer as defined in the Janus architecture.  
- This protocol applies to visual interfaces with human end-users.  
- Loading visibility is validated through human review of the interaction path, not by implementation detail.  
- This protocol complements "Predictable Interaction States".  
- This protocol adds perceptible wait as the activation criterion. Predictable Interaction States defines what states exist. This protocol defines when loading must be shown.

## Status
draft
