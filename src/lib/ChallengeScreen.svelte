<script>
  import TailOption from './TailOption.svelte';

  let { challenge, disabledOptionIds, onSelect, onClues, overlayOpen = false } = $props();

  const ASSETS_BASE = import.meta.env.VITE_IMAGE_BASE;

  // Copy read from the Figma challenge#1 / challenge#2 text layers.
  const GAME_TITLE = 'Fluke Matching Game';
  const GAME_INTRO =
    'Humpback whales have unique patterns of black and white pigmentation and ' +
    'scars on the underside of their flukes or tails. Like fingerprints are to ' +
    'humans, no two whales have the same patterns. These patterns are the ' +
    'inspiration for each whale’s name.';
  const GAME_SUBINTRO =
    'Try to match the fluke patterns and learn these whales’ names. ' +
    'There are four challenges.';
  const TAP_PROMPT = 'Tap the whale tail below that you think matches the tail on the left.';

  // Option slots, relative to .bottom-area. Row-major, matching challenge#2 —
  // challenge#1's layers are arranged down the columns instead, but that reads
  // as a stray rearrangement rather than intent, and row-major is what the
  // existing correctOptionId values were verified against.
  const OPTION_POS = [
    { left: 1003, top: 32 },
    { left: 1430, top: 32 },
    { left: 1003, top: 269 },
    { left: 1430, top: 269 },
    { left: 1003, top: 507 },
    { left: 1430, top: 507 },
  ];
</script>

<h1 class="game-title">{GAME_TITLE}</h1>
<p class="game-intro">{GAME_INTRO}</p>
<p class="game-subintro">{GAME_SUBINTRO}</p>
<p class="tap-prompt">{TAP_PROMPT}</p>
<button class="btn-clues" onclick={onClues}>Tips for Matching</button>

<div class="bottom-area">
  <div class="flame">
    <img src="{ASSETS_BASE}/{challenge.targetImage}" alt="The whale fluke to match" />
  </div>

  <p class="challenge-label">{challenge.title}</p>

  {#each challenge.options as option, i (option.id)}
    <TailOption
      {option}
      left={OPTION_POS[i].left}
      top={OPTION_POS[i].top}
      ruledOut={disabledOptionIds.includes(option.id)}
      inert={overlayOpen}
      {onSelect}
    />
  {/each}
</div>

<style>
  /* Figma frame coordinates; <Stage> scales the 1920x1080 canvas to fit. */
  .game-title {
    position: absolute;
    left: 75px;
    top: 32px;
    margin: 0;
    font-size: 72px;
    font-weight: 400;
    line-height: normal;
    color: var(--text-pale);
    white-space: nowrap;
  }

  .game-intro {
    position: absolute;
    left: 75px;
    top: 111px;
    width: 874px;
    height: 170px;
    margin: 0;
    font-size: 28px;
    line-height: normal;
    color: var(--text-pale);
  }

  .game-subintro {
    position: absolute;
    left: 1003px;
    top: 111px;
    width: 810px;
    height: 68px;
    margin: 0;
    font-size: 28px;
    line-height: normal;
    color: #fff;
  }

  .tap-prompt {
    position: absolute;
    left: 1003px;
    top: 179px;
    width: 824px;
    height: 50px;
    margin: 0;
    font-size: 28px;
    line-height: normal;
    color: #fff;
  }

  .btn-clues {
    position: absolute;
    left: 1003px;
    top: 229px;
    width: 220px;
    height: 59px;
    background: var(--btn-bg);
    border: 1px solid var(--btn-border);
    border-radius: 5px;
    color: #fff;
    font-size: 24px;
    line-height: normal;
  }

  .bottom-area {
    position: absolute;
    left: 0;
    top: 310px;
    width: 1920px;
    height: 770px;
    background: var(--navy-panel);
  }

  .flame {
    position: absolute;
    left: 68px;
    top: 32px;
    width: 892px;
    height: 482px;
  }

  .flame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .challenge-label {
    position: absolute;
    left: 68px;
    top: 544px;
    width: 424px;
    height: 31px;
    margin: 0;
    font-size: 32px;
    line-height: normal;
    color: #fff;
  }
</style>
