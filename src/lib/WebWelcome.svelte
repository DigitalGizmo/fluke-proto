<script>
  // Figma frame "web welcome" (node 377:6) — the non-attract entry screen, and
  // where "Start Over" lands on web builds.
  let { onBegin } = $props();

  const ASSETS_BASE = import.meta.env.VITE_IMAGE_BASE;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<div class="welcome" onclick={onBegin} role="button" tabindex="0">
  <div class="bg-frame">
    <img src="{ASSETS_BASE}/welcome/welcome.jpg" alt="" />
  </div>

  <h1>Fluke Matching Game</h1>

  <div class="plate">
    <p>Test your ability<br />to match whales’ tails and<br />recognize individual humpbacks.</p>
    <span class="start">Let’s start!</span>
  </div>
</div>

<style>
  .welcome {
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

  .bg-frame img {
    position: absolute;
    left: 0.08%;
    top: 12.2%;
    width: 99.92%;
    height: 100%;
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

  .plate {
    position: absolute;
    left: 596px;
    top: 268px;
    width: 728px;
    height: 239px;
    background: var(--navy-panel);
    overflow: hidden;
    text-align: center;
    color: #fff;
    font-size: 40px;
    line-height: normal;
    transition: background 0.2s ease;
  }

  .plate p {
    margin: 13px 0 0;
  }

  .start {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 171px;
    text-decoration: underline;
    white-space: nowrap;
  }

  .welcome:hover .plate {
    background: var(--btn-bg);
  }
</style>
