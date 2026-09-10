<script>
  import OverlayPanel from './OverlayPanel.svelte';

  // The four outcomes from Figma frames challenge1-opt1-correct / -incorrect and
  // challenge1-opt2-correct / -incorrect. Correctness is judged on the user's
  // yes/no answer, not on which tile they tapped:
  //
  //   right fluke + "yes" -> the whale's own opener ("You're right!")
  //   right fluke + "no"  -> ALT_OPENER, same story, still advances
  //   wrong fluke + "no"  -> "Good eye!", back to the grid
  //   wrong fluke + "yes" -> "Sorry", back to the grid
  let { image, isCorrectFluke, saidYes, reveal, buttonLabel, onAction } = $props();

  // Universal across whales — only the opener line swaps.
  const ALT_OPENER = 'Actually, this IS the correct whale!';
  const WRONG_GOOD_EYE = 'Good eye! this is NOT the same whale.';
  const WRONG_SORRY = 'Sorry, this is NOT the same whale.';

  let lines = $derived(
    isCorrectFluke
      ? (saidYes ? reveal.lines : [ALT_OPENER, ...reveal.lines.slice(1)])
      : [saidYes ? WRONG_SORRY : WRONG_GOOD_EYE]
  );

  // The ring only makes sense when we're actually revealing the matching whale.
  let highlight = $derived(isCorrectFluke ? reveal.highlight : null);
</script>

<OverlayPanel {image} {highlight}>
  {#snippet children()}
    <div class="copy">
      {#each lines as line}
        <p>{line}</p>
      {/each}
    </div>

    <button class="action" onclick={onAction}>{buttonLabel}</button>
  {/snippet}
</OverlayPanel>

<style>
  .copy {
    width: 808px;
    font-size: 38px;
    line-height: normal;
    text-align: center;
    color: #fff;
  }

  .copy p {
    margin: 0;
  }

  .action {
    flex: none;
    width: 250px;
    height: 59px;
    padding: 0;
    margin-top: 24px;
    background: var(--btn-light);
    border: 1px solid var(--btn-border);
    border-radius: 5px;
    color: var(--btn-light-text);
    font-size: 24px;
    line-height: normal;
  }
</style>
