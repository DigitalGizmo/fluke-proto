<script>
  let { onTryAgain, onClues } = $props();
</script>

<!-- Figma frame `incorrect` (node 3:48) is 1920x750 on a #042437 ground — it
     covers only the bottom-area, leaving the header visible above it. -->
<div class="incorrect">
  <p class="headline">Sorry, wrong whale!</p>

  <button class="btn-try-again" onclick={onTryAgain}>Try again</button>

  <!-- Second button in the design is Clues &amp; Tips, not "Try another whale". -->
  <button class="btn-clues" onclick={onClues}>Clues &amp; Tips</button>
</div>

<style>
  .incorrect {
    position: absolute;
    left: 0;
    top: 328px;
    width: 1920px;
    height: 750px;
    background: var(--navy-deep);
    z-index: 10;
  }

  .headline {
    position: absolute;
    left: 723px;
    top: 238px;
    margin: 0;
    font-size: 64px;
    font-style: italic;
    line-height: normal;
    color: #fff;
    white-space: nowrap;
  }

  .btn-try-again {
    position: absolute;
    left: 835px;
    top: 392px;
    width: 278px;
    height: 86px;
    background: var(--btn-bg);
    border: 1px solid var(--btn-border);
    border-radius: 5px;
    color: #fff;
    font-size: 48px;
    line-height: normal;
  }

  .btn-clues {
    position: absolute;
    left: 875px;
    top: 555px;
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
