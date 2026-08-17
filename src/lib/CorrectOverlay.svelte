<script>
  let { reveal, image, onNext } = $props();

  const ASSETS_BASE = import.meta.env.VITE_IMAGE_BASE;
</script>

<!-- Figma frame `whale#1-correct` (node 1:2) is 1920x750 — like the incorrect
     overlay it covers only the bottom-area. -->
<div class="correct">
  <div class="flame">
    <img src="{ASSETS_BASE}/{image}" alt="The matching whale fluke" />
  </div>

  <!-- Orange ring calling out the marking the whale is named for (node 268:26). -->
  <img class="highlight" src="{ASSETS_BASE}/whale1/highlight.svg" alt="" />

  <div class="story">
    {#each reveal.lines as line}
      <p>{line}</p>
    {/each}
  </div>

  <button class="btn-next" onclick={onNext}>Try the next whale</button>
</div>

<style>
  .correct {
    position: absolute;
    left: 0;
    top: 328px;
    width: 1920px;
    height: 750px;
    background: var(--navy-panel);
    z-index: 10;
  }

  .flame {
    position: absolute;
    left: 99px;
    top: 96px;
    width: 1042px;
    height: 563px;
  }

  .flame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .highlight {
    position: absolute;
    left: 697px;
    top: 285px;
    width: 132px;
    height: 132px;
  }

  .story {
    position: absolute;
    left: 1258px;
    top: 86px;
    width: 563px;
    font-size: 48px;
    font-style: italic;
    color: #fff;
  }

  .story p {
    margin: 0;
    line-height: normal;
  }

  .btn-next {
    position: absolute;
    left: 1258px;
    top: 544px;
    width: 250px;
    height: 59px;
    background: var(--btn-bg);
    border: 1px solid var(--btn-border);
    border-radius: 5px;
    color: #fff;
    font-size: 24px;
    line-height: normal;
  }
</style>
