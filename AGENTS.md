# AGENTS.md

This file gives project-specific instructions to Codex and future coding agents working in this repository.

## Project Purpose

This is an English grammar learning site for students who:

- have low patience
- do not like reading long explanations
- are more willing to click, choose, drag, and interact than read paragraphs

The goal is not to maximize text coverage. The goal is to maximize useful engagement.

## Core Product Rules

When editing lesson content, prefer these rules over generic educational-writing habits.

1. Use fewer words.
2. Use more interaction.
3. Teach one tiny point, then immediately test it.
4. Keep examples minimal unless they directly support a practice step.
5. Chinese should lead the instruction text for beginner-facing practice.
6. English can remain in the sentence itself, but the question prompt should usually be Chinese-first.

Bad pattern:

- long explanation block
- many examples
- all practice placed at the very bottom

Preferred pattern:

1. tiny visual / structure card
2. 2-4 question micro-practice
3. tiny follow-up explanation if needed
4. another 2-4 question micro-practice
5. final formal practice section

## Lesson Design Guidelines

For beginner lessons, default to this structure:

1. One-line intro
2. Small card / visual / formula
3. Fast Check 1
4. Small next concept card
5. Fast Check 2
6. Final practice block

### Text Rules

- Avoid large text walls.
- Avoid lecture-style explanations.
- Avoid showing many examples in a dedicated example section unless necessary.
- If a rule can be shown with a diagram/card, prefer that over a paragraph.
- If a sentence example exists, it should usually support a question right after it.

### Practice Rules

- Every lesson should feel interactive early, not only at the end.
- Use micro-practices in the middle of teaching.
- Keep the final formal practice, usually 8 questions.
- If a lesson has two stages, auto-advance to the next stage when appropriate instead of forcing unnecessary clicks.
- If students can get confused by wording, simplify the prompt before adding more explanation.

### Language Rules

- Beginner-facing prompts should be simple Chinese.
- Avoid English-only prompts such as "Which word is the subject?"
- Prefer Chinese like:
  - `谁是主语？`
  - `哪个是谓语？`
  - `这是主谓宾吗？`

## Specific UX Preferences From The User

The user explicitly prefers:

- fewer explanations
- more exercises
- less passive reading
- more visual guidance
- fewer standalone example blocks
- example content embedded into interaction when possible
- immediate continuity between related exercise stages

If choosing between:

- "more detailed explanation"
- "one more short interactive exercise"

prefer the exercise.

## Current Content Direction

Recent accepted direction in this repo:

- `Prepositions` was moved toward:
  - visual cards
  - short labels
  - micro-practices before final practice
- `SVO` was moved toward:
  - concept cards
  - Chinese-first micro-practice
  - reduced example count
  - automatic progression between exercise stages

Future edits in grammar lessons should generally follow this same direction unless the user asks otherwise.

## Codebase Notes

Important lesson files live under:

- `src/components/content/PartsOfSpeech/`
- `src/components/content/Structures/`
- `src/components/content/SentenceComponents/`
- `src/components/practice/`

Common reusable practice components include:

- `WordSelectorPractice`
- `MultipleChoicePractice`
- `SentenceBuilderPractice`
- `FillInTheBlankPractice`

Prefer reusing these components before creating new ones.

## Content Workflow

Before changing lesson wording, teaching order, examples, or practice design:

1. update the relevant doc in `content-docs/`
2. confirm the content direction there first
3. only then sync the approved doc into the TSX lesson files

Use these files as the planning source of truth:

- `content-docs/README.md`
- `content-docs/00-curriculum-map.md`
- `content-docs/<module>/00-module-overview.md`
- `content-docs/<module>/<unit>.md`

Do not treat the current TSX lesson wording as the best source of truth for teaching quality. The docs layer exists so content can be revised cleanly before UI implementation.

## Speech / Voice Rules

The site uses browser `speechSynthesis`, but voice behavior must be controlled globally, not inside each lesson component.

- Global speech configuration lives in `src/utils/configureSpeechSynthesis.ts`
- It is initialized from `src/main.tsx`
- The product goal is a normal, stable English voice across the whole site
- All English playback should use the same selected voice when possible
- Default English playback should remain near:
  - `rate = 0.96`
  - `pitch = 1`
- Avoid novelty / robotic / exaggerated voices
- Do not add per-page voice selection logic unless the user explicitly asks for different voices
- Do not set `pitch` above `1` just to make the voice sound brighter; this previously made the audio sound strange

When editing lesson files:

- It is acceptable for components to keep creating `SpeechSynthesisUtterance`
- Do not rely on lesson-level voice tuning for consistency
- If voice quality or consistency needs to change, update the global logic in `src/utils/configureSpeechSynthesis.ts` instead of patching many lesson files

## Change Safety

Before making a substantial content or interaction change, create a backup archive in the parent workspace using the pattern:

- `english-grammar-page-backup-YYYYMMDD-HHMMSS.tar.gz`

After edits:

1. run `npm run build`
2. fix any TSX/build errors
3. let the user review one small unit before rolling changes across many pages

## Default Strategy For Future Work

If the user asks to improve a lesson but does not specify the exact implementation:

1. back up the project
2. change only one small lesson first
3. prefer fewer words and more practice
4. ask the user to review that one unit
5. only then roll the pattern out to other lessons
