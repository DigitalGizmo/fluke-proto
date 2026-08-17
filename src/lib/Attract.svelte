<script>
  import { onMount, onDestroy } from 'svelte';

  let { onBegin } = $props();

  const ASSETS_BASE = `${import.meta.env.VITE_IMAGE_BASE}/attract`;
  // attract1-attract3 differ only by background photo (Figma nodes 121:2/6/16).
  // Each photo is inset from the top of its frame, which is what leaves the dark
  // band behind the title. Offsets are the Figma values.
  const slugs = [
    { name: 'attract1', top: '12.57%' },
    { name: 'attract2', top: '12.2%' },
    { name: 'attract3', top: '12.2%' },
  ];

  let currentIndex = $state(0);
  let intervalId;

  onMount(() => {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % slugs.length;
    }, 4000);
  });

  onDestroy(() => clearInterval(intervalId));
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<div class="attract" onclick={onBegin} role="button" tabindex="0">
  <div class="bg-frame">
    {#each slugs as slug, i}
      <img
        src="{ASSETS_BASE}/{slug.name}.jpg"
        class="bg"
        class:active={i === currentIndex}
        style="top:{slug.top};"
        alt=""
      />
    {/each}
  </div>

  <h1>Fluke Matching Game</h1>

  <div class="tap-plate">
    <span>Tap to Begin</span>
  </div>
</div>

<style>
  /* Figma frames attract1-3: 1920x1080, photo inset at top 43px. */
  .attract {
    position: absolute;
    inset: 0;
    background: var(--navy-deep);
    cursor: pointer;
    user-select: none;
  }

  .bg-frame {
    position: absolute;
    left: 0;
    top: 43px;
    width: 1920px;
    height: 1037px;
    overflow: hidden;
  }

  .bg {
    position: absolute;
    left: 0.08%;
    width: 99.92%;
    height: 100%;
    opacity: 0;
    transition: opacity 2s ease-in-out;
  }

  .bg.active {
    opacity: 1;
  }

  h1 {
    position: absolute;
    left: 364px;
    top: -3px;
    margin: 0;
    font-size: 128px;
    font-weight: 400;
    line-height: normal;
    color: #fff;
    white-space: nowrap;
  }

  .tap-plate {
    position: absolute;
    left: 596px;
    top: 268px;
    width: 728px;
    height: 138px;
    background: var(--navy-panel);
    overflow: hidden;
    transition: background 0.2s ease;
  }

  .tap-plate span {
    position: absolute;
    left: 162px;
    top: 26px;
    font-size: 72px;
    line-height: normal;
    color: #fff;
    white-space: nowrap;
  }

  .attract:hover .tap-plate {
    background: var(--btn-bg);
  }
</style>
