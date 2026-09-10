<script>
  // Shared shell for the confirm and feedback panels. Both are 951x770 sitting
  // over the option grid only (Figma frames challenge1-opt1 / -correct /
  // -incorrect), so the target fluke stays visible on the left for comparison.
  //
  // The fluke sits at fixed Figma coordinates, but everything below it is a
  // centered flex column rather than absolutely positioned: the feedback copy
  // runs from one short line ("Sorry, this is NOT the same whale.") to whale
  // #3's four-line story, and absolute tops would collide at the long end.
  let { image, highlight = null, children } = $props();

  const ASSETS_BASE = import.meta.env.VITE_IMAGE_BASE;
</script>

<div class="panel">
  <div class="flame">
    <img src="{ASSETS_BASE}/{image}" alt="" />

    {#if highlight}
      <!-- Orange ring calling out the marking the whale is named for. -->
      <svg
        class="ring"
        style="left:{highlight.left - 34}px; top:{highlight.top - 30}px;
               width:{highlight.size}px; height:{highlight.size}px;"
        viewBox="0 0 110 110"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="55" cy="55" r="52.5" stroke="var(--highlight)" stroke-width="5" />
      </svg>
    {/if}
  </div>

  <div class="body">
    {@render children()}
  </div>
</div>

<style>
  .panel {
    position: absolute;
    left: 969px;
    top: 310px;
    width: 951px;
    height: 770px;
    background: var(--panel);
    border: 1px solid var(--panel-border);
    box-sizing: border-box;
    z-index: 10;
  }

  .flame {
    position: absolute;
    left: 34px;
    top: 30px;
    width: 880px;
    height: 475px;
  }

  .flame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ring {
    position: absolute;
    display: block;
  }

  .body {
    position: absolute;
    left: 0;
    top: 505px;
    width: 951px;
    height: 265px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 6px;
    box-sizing: border-box;
  }
</style>
