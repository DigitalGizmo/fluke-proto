<script>
  // 418x229 with a 1px #8c8c8c stroke, per the Figma option frames.
  //
  // Two distinct reasons a tile can't be clicked, kept separate because only one
  // of them should look different: `ruledOut` is a fluke the user eliminated via
  // "Try again" and stays visibly greyed; `inert` just means a panel is covering
  // the grid, which shouldn't restyle anything but must keep the tile out of the
  // tab order.
  let { option, left, top, ruledOut = false, inert = false, onSelect } = $props();

  const ASSETS_BASE = import.meta.env.VITE_IMAGE_BASE;
</script>

<button
  class="tail-option"
  class:ruled-out={ruledOut}
  style="left:{left}px; top:{top}px;"
  disabled={ruledOut || inert}
  onclick={() => onSelect(option.id)}
>
  <img src="{ASSETS_BASE}/{option.imageName}" alt="Whale fluke option" />
</button>

<style>
  .tail-option {
    position: absolute;
    width: 418px;
    height: 229px;
    padding: 0;
    border: 1px solid var(--option-border);
    background: none;
    overflow: hidden;
  }

  .tail-option img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .tail-option:hover:not(:disabled) {
    border-color: #fff;
  }

  .tail-option.ruled-out img {
    filter: grayscale(1);
    opacity: 0.35;
  }
</style>
