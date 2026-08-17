<script>
  // The Figma flame-opt component has Default and Disabled variants (no hover
  // variant), so those map onto a real <button>'s own states. Using a button
  // also gets keyboard operation for free.
  let { option, left, top, disabled = false, onSelect } = $props();

  const ASSETS_BASE = import.meta.env.VITE_IMAGE_BASE;
</script>

<button
  class="tail-option"
  style="left:{left}px; top:{top}px;"
  {disabled}
  onclick={() => onSelect(option.id)}
>
  <img src="{ASSETS_BASE}/{option.imageName}" alt="Whale fluke option" />
</button>

<style>
  /* 320x175 with a 1px #8c8c8c stroke, per the Figma option frames. */
  .tail-option {
    position: absolute;
    width: 320px;
    height: 175px;
    padding: 0;
    border: 1px solid var(--option-border);
    background: none;
    overflow: hidden;
  }

  .tail-option img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .tail-option:hover:not(:disabled) {
    border-color: #fff;
  }

  .tail-option:disabled img {
    filter: grayscale(1);
    opacity: 0.35;
  }
</style>
