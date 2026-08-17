<script>
  let { onClose } = $props();

  const ASSETS_BASE = `${import.meta.env.VITE_IMAGE_BASE}/clues`;

  // Copy and geometry read from the Figma `Clues` frame (node 13:142).
  // Each row's text is right-aligned to x=1245; `left` is 1245 minus its width.
  const ROWS = [
    {
      label: 'Shape',
      labelTop: 106,
      ruleTop: 112,
      text: 'Both the color and SHAPE of flukes can be different.',
      textTop: 116,
      textLeft: 846,
      textWidth: 399,
      imgTop: 116,
      imgHeight: 148,
      images: ['shape1.jpg', 'shape2.jpg'],
    },
    {
      label: 'Scars',
      labelTop: 299,
      ruleTop: 306,
      text:
        'Scars can change a little over time, but are still important when ' +
        'matching flukes. White skin scars to black and black skin scars to white.',
      textTop: 308,
      textLeft: 793,
      textWidth: 452,
      imgTop: 310,
      imgHeight: 160,
      images: ['scars1.jpg', 'scars2.jpg'],
    },
    {
      label: 'Lighting',
      labelTop: 509,
      ruleTop: 515,
      text:
        'Shadows can hide scars. Below are two photos of the same whale with ' +
        'different lighting. Be sure to also look at the trailing (or top) edge ' +
        'for clues when matching.',
      textTop: 517,
      textLeft: 775,
      textWidth: 470,
      imgTop: 519,
      imgHeight: 155,
      images: ['lighting1.jpg', 'lighting2.jpg'],
    },
  ];

  const IMG_LEFT = [1273, 1549];
</script>

<!-- Figma frame `Clues` (node 13:142) is 1920x750 — like the other overlays it
     covers the bottom-area, leaving the header visible. -->
<div class="clues">
  <h2 class="title">Tips for<br />Fluke<br />Matching</h2>

  {#each ROWS as row}
    <p class="label" style="top:{row.labelTop}px;">{row.label}</p>
    <div class="rule" style="top:{row.ruleTop}px;"></div>
    <p
      class="body"
      style="top:{row.textTop}px; left:{row.textLeft}px; width:{row.textWidth}px;"
    >{row.text}</p>

    {#each row.images as img, i}
      <img
        class="shot"
        style="top:{row.imgTop}px; left:{IMG_LEFT[i]}px; height:{row.imgHeight}px;"
        src="{ASSETS_BASE}/{img}"
        alt=""
      />
    {/each}
  {/each}

  <button class="btn-close" onclick={onClose} aria-label="Close clues and tips">
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="31" stroke="currentColor" stroke-width="2" />
      <path d="M9 9L54 54M9 54L54 9" stroke="currentColor" stroke-width="2" />
    </svg>
  </button>
</div>

<style>
  .clues {
    position: absolute;
    left: 0;
    top: 328px;
    width: 1920px;
    height: 750px;
    background: var(--navy-panel);
    z-index: 20;
  }

  .title {
    position: absolute;
    left: 46px;
    top: 106px;
    margin: 0;
    font-size: 72px;
    font-weight: 400;
    line-height: normal;
    color: var(--clues-accent);
    white-space: nowrap;
  }

  .label {
    position: absolute;
    left: 564px;
    margin: 0;
    font-size: 48px;
    line-height: normal;
    color: var(--clues-accent);
    white-space: nowrap;
  }

  /* Figma draws these as 2px vector strokes; a border is the same thing. */
  .rule {
    position: absolute;
    left: 564px;
    width: 1237px;
    border-top: 2px solid var(--clues-accent);
  }

  .body {
    position: absolute;
    margin: 0;
    font-size: 24px;
    line-height: normal;
    text-align: right;
    color: #f9f7f6;
  }

  .shot {
    position: absolute;
    width: 250px;
    object-fit: cover;
  }

  .btn-close {
    position: absolute;
    left: 1838px;
    top: 15px;
    width: 64px;
    height: 64px;
    padding: 0;
    border: none;
    background: none;
    color: #d9d9d9;
    transition: color 0.2s ease;
  }

  .btn-close svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .btn-close:hover {
    color: #fff;
  }
</style>
