# Fluke Matching Game — Prototype Spec (Draft)

## Goal
Build a working, click-through Svelte prototype of the whale fluke matching game, replicating the Figma design's visuals and interaction logic, without relying on Figma's native prototype/variable system. Source visuals and layout data via the Figma MCP server; implement game logic natively in React state.

## Source of Truth
- **Figma file:** Whales-FlukeID (Team project, Page 1)
- **Frames of interest:** `attract1`–`attract3`, `whale#1`, `whale#2` (and presumably `whale#3`, `whale#4` — need confirmation), `Clues`, `incorrect`, `whale#1-correct` (per-whale correct overlays likely exist for each whale)
- **Components of interest:** `option1`/`option2` (tail option buttons, variants: Default/hover/disabled), `flame-opt1`–`flame-opt6` (six tail option slots per challenge)

## Scope for This Pass
Build **one challenge only** (whale#1), fully working with **all six** option tail images (the Figma design only shows two of the six — `flame-opt1` and `flame-opt6` — wired up; the rest are placeholders in Figma but should all be real, clickable, correctly-imaged options in the prototype). Which of the six is correct is TBD — leave it as an easily-changeable config value (e.g. a single `correctOptionId` field) rather than hardcoding logic around a specific option, so it can be set later without touching game logic. The remaining 3 whale challenges (per "Whale Challenge 1 of 4") are out of scope for this pass but the data model below should make adding them trivial later.

## Data Model
Each challenge needs:
```js
{
  id: "whale1",
  targetImage: "url or asset ref",       // the tail to match
  options: [
    { id: "opt1", image: "..." },
    { id: "opt2", image: "..." },
    { id: "opt3", image: "..." },
    { id: "opt4", image: "..." },
    { id: "opt5", image: "..." },
    { id: "opt6", image: "..." },
  ],
  correctOptionId: "opt2",   // TBD — placeholder, easy to change later
  correctReveal: {
    name: "Vector",
    story: "You're right! My name is Vector. I was named for the fuzzy 'V' shape on my right fluke."
  }
}
```

## State (per challenge)
Implement as Svelte reactive state (plain `let`/`$state` runes or a small store — match whatever pattern your other projects use):
- `currentChallengeIndex`: which whale challenge is active (fixed at `0` for this pass, but keep it as real state, not a constant, so multi-challenge is a drop-in later)
- `disabledOptionIds`: Set of option ids the user has gotten wrong *for this challenge* (grows across repeated "Try again" attempts; resets only on moving to a new challenge)
- `overlay`: `null | "incorrect" | "correct"`
- `lastSelectedOptionId`: the option just tapped (transient, used to know which id to add to `disabledOptionIds` if "Try again" is chosen, and which id to *skip* disabling if "Try another whale" is chosen — see below)

## Interaction Flow
1. **Attract screen** → "Tap to Begin" → first challenge.
2. **Challenge screen**: target tail shown top-left; 6 option buttons shown. Options already in `disabledOptionIds` render in the disabled/grayed variant and are non-interactive.
3. **User taps an option:**
   - Set `lastSelectedOptionId = option.id`
   - If `option.id === correctOptionId`: set `overlay = "correct"`
   - Else: set `overlay = "incorrect"` (do **not** add to `disabledOptionIds` yet — that only happens based on which button the user picks on the overlay, see step 4)
4. **"Sorry, wrong whale!" overlay** (`overlay === "incorrect"`) has two buttons:
   - **"Try again"** → add `lastSelectedOptionId` to `disabledOptionIds`, set `overlay = null`. Returns to the challenge screen with that one option now disabled/grayed, the other five (including any previously disabled from earlier wrong guesses) unaffected.
   - **"Try another whale"** → the user is giving up on this challenge entirely. For this single-challenge pass, treat this as: close overlay, reset `disabledOptionIds` to empty, and either restart the same challenge fresh or show a simple "prototype ends here" state (open question below) — in the full game this would jump to a different whale challenge, skipping the current one.
5. **"That's correct!" overlay** (`overlay === "correct"`):
   - Shows whale name/story per `correctReveal`
   - Button: **"Next challenge"** → for this pass, since there's only one challenge, this can simply reset the challenge (loop back to a fresh `disabledOptionIds` and `overlay = null`) or show a "prototype complete" placeholder screen — good enough for review purposes; not meant to be final behavior once more challenges are added.
6. Clues/Tips overlay is out of scope for this pass (not mentioned in your latest spec) — omit it unless you want it included.

## Component Breakdown (Svelte)
- `App.svelte` (or top-level route component) — holds global state (challenge index, disabled options, overlay, last selected option)
- `AttractScreen.svelte`
- `ChallengeScreen.svelte` — props: `targetImage`, `options`, `disabledOptionIds`; emits option-selected event
- `TailOption.svelte` — props: `image`, `state` (`default`/`hover`/`disabled`); emits click event
- `IncorrectOverlay.svelte` — emits `tryAgain` / `tryAnotherWhale` events
- `CorrectOverlay.svelte` — props: `whaleName`, `story`; emits `next` event

Match whatever component/event/prop conventions are already established in your other Svelte projects (e.g. dispatch pattern vs. callback props, file naming, where styles live) rather than introducing a new pattern here.

## Figma MCP Asset Pull Checklist
- [ ] Export tail photos for target + all option images, per challenge (need actual image assets, not just screenshots)
- [ ] Pull color tokens/variables (dark navy header, button blues, disabled gray) so the React build matches design system values rather than eyeballed hex codes
- [ ] Pull typography (header serif font, body font) — confirm licensing/availability for web use
- [ ] Confirm exact copy text for each overlay (button labels, whale story copy) directly from Figma layers rather than transcribing from screenshots

## Open Questions Before Build
1. On **"Try another whale"** in this single-challenge prototype: should it just restart the current challenge fresh (simplest), or show a distinct "moved on" placeholder screen even though there's nowhere real to move on to yet?
2. Which option id is actually correct — leaving as a placeholder config value per the scope note above; fine to decide after the prototype is built and functional.
3. Any timer, scoring, or progress indicator ("Challenge 1 of 4") wanted even in this single-challenge pass, or purely pass/fail click-through?
4. Any requirement for keyboard/accessibility support in this pass, or purely mouse/touch click-through for review purposes?

## Suggested Delivery Format
Svelte component(s), following the styling/structure conventions used in Don's other Svelte/web projects, static image URLs pulled via Figma MCP export. No backend/persistence needed for a click-through prototype.