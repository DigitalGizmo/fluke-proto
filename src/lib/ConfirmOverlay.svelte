<script>
  import OverlayPanel from './OverlayPanel.svelte';

  // Figma frame challenge1-opt1 (node 572:177). Tapping a tile no longer decides
  // anything — it asks the user to commit to a yes/no, and that answer is what
  // gets judged.
  let { image, onAnswer } = $props();
</script>

<OverlayPanel {image}>
  {#snippet children()}
    <p class="question">Is this the same whale as the whale to the left?</p>

    <div class="actions">
      <button onclick={() => onAnswer(true)}>Yes, this is the whale</button>
      <button onclick={() => onAnswer(false)}>No, not this whale</button>
    </div>
  {/snippet}
</OverlayPanel>

<style>
  .question {
    margin: 0;
    width: 808px;
    font-size: 38px;
    line-height: normal;
    text-align: center;
    color: #fff;
  }

  .actions {
    display: flex;
    gap: 162px; /* Figma: buttons at x=119 and x=531, each 250 wide */
    margin-top: 32px;
  }

  .actions button {
    width: 250px;
    height: 59px;
    padding: 0;
    background: var(--btn-light);
    border: 1px solid var(--btn-border);
    border-radius: 5px;
    color: var(--btn-light-text);
    font-size: 24px;
    line-height: normal;
  }
</style>
