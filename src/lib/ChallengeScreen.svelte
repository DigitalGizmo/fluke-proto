<script>
  import TailOption from './TailOption.svelte';

  let { challenge, disabledOptionIds, onSelect, onClues } = $props();

  const ASSETS_BASE = import.meta.env.VITE_IMAGE_BASE;

  // Copy read from the Figma text layers of frame whale#1 (node 3:34).
  // Header chrome is identical across whale#1-#4, so it lives here rather than
  // in the per-challenge data.
  const GAME_TITLE = 'Fluke Matching Game';
  const GAME_INTRO =
    'Humpback whales have unique patterns of black and white pigmentation and ' +
    'scars on the underside of their flukes or tails. Like fingerprints are to ' +
    'humans, no two whales have the same patterns. These patterns are the ' +
    'inspiration for each whale’s name.';
  const GAME_SUBINTRO =
    'See if you can match the patterns and learn these whales names. ' +
    'There are four challenges.';
  const TAP_PROMPT = 'Tap the whale tail below that matches';

  // Option slot positions, relative to .bottom-area, straight from the Figma
  // option frames (2 columns x 3 rows, 320x175 each).
  const OPTION_POS = [
    { left: 1157, top: 69 },
    { left: 1497, top: 69 },
    { left: 1156, top: 260 },
    { left: 1497, top: 260 },
    { left: 1156, top: 454 },
    { left: 1497, top: 454 },
  ];
</script>

<h1 class="game-title">{GAME_TITLE}</h1>
<p class="game-intro">{GAME_INTRO}</p>
<p class="game-subintro">{GAME_SUBINTRO}</p>

<div class="bottom-area">
  <p class="challenge-label">{challenge.title}</p>
  <p class="tap-prompt">{TAP_PROMPT}</p>

  <div class="flame">
    <img src="{ASSETS_BASE}/{challenge.targetImage}" alt="The whale fluke to match" />
  </div>

  {#each challenge.options as option, i (option.id)}
    <TailOption
      {option}
      left={OPTION_POS[i].left}
      top={OPTION_POS[i].top}
      disabled={disabledOptionIds.includes(option.id)}
      {onSelect}
    />
  {/each}

  <button class="btn-clues" onclick={onClues}>Clues &amp; Tips</button>
</div>

<style>
  /* All values below are the Figma frame's own pixel coordinates. The parent
     <Stage> scales the whole 1920x1080 canvas to fit the viewport. */
  .game-title {
    position: absolute;
    left: 91px;
    top: 42px;
    margin: 0;
    font-size: 72px;
    font-weight: 400;
    line-height: normal;
    color: var(--text-pale);
    white-space: nowrap;
  }

  .game-intro {
    position: absolute;
    left: 91px;
    top: 121.5px;
    width: 1000px;
    height: 170px;
    margin: 0;
    font-size: 28px;
    line-height: normal;
    color: var(--text-pale);
  }

  .game-subintro {
    position: absolute;
    left: 1157px;
    top: 236px;
    width: 717px;
    height: 88px;
    margin: 0;
    font-size: 32px;
    line-height: normal;
    color: #fff;
  }

  .bottom-area {
    position: absolute;
    left: 1px;
    top: 328px;
    width: 1920px;
    height: 750px;
    background: var(--navy-panel);
  }

  .challenge-label,
  .tap-prompt {
    position: absolute;
    top: 20px;
    width: 424px;
    height: 31px;
    margin: 0;
    font-size: 24px;
    line-height: normal;
    color: #fff;
  }

  .challenge-label { left: 90px; }
  .tap-prompt { left: 1156px; }

  .flame {
    position: absolute;
    left: 90px;
    top: 68px;
    width: 1042px;
    height: 563px;
  }

  .flame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .btn-clues {
    position: absolute;
    left: 1619px;
    top: 658px;
    width: 198px;
    height: 59px;
    background: var(--btn-bg);
    border: 1px solid var(--btn-border);
    border-radius: 5px;
    color: #fff;
    font-size: 24px;
    line-height: normal;
  }
</style>
