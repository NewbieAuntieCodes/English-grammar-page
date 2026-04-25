# English Grammar Content Docs

This directory is the planning layer for English Grammar Page content.

## Workflow

1. Decide teaching content here first.
2. Edit or approve the Markdown docs.
3. Ask Codex to sync the approved docs back into the React lesson files.

## Why this exists

- The current TSX files mix content, UI, and interaction.
- It is hard to judge whether a lesson is good when the wording lives inside components.
- These docs separate `content decision` from `page implementation`.

## Recommended editing rule

- Keep explanations short.
- Prefer clear learning targets.
- Write examples only when they support practice.
- Define micro-practice and final practice in the doc before changing code.

## Structure

- `00-curriculum-map.md`: overall module map
- `00-practice-components.md`: current reusable exercise components
- `NN-module-slug/`: one folder per module
- `NN-module-slug/00-module-overview.md`: module overview
- `NN-module-slug/NN-unit-slug.md`: one file per unit
