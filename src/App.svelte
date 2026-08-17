<script>
  import challenges from './lib/challenges.json';
  import Stage from './lib/Stage.svelte';
  import Attract from './lib/Attract.svelte';
  import ChallengeScreen from './lib/ChallengeScreen.svelte';
  import IncorrectOverlay from './lib/IncorrectOverlay.svelte';
  import CorrectOverlay from './lib/CorrectOverlay.svelte';
  import CluesOverlay from './lib/CluesOverlay.svelte';

  let screen = $state(/** @type {'attract' | 'challenge'} */ ('attract'));
  // Kept as real state rather than a constant so adding whales #2-#4 is a drop-in.
  let currentChallengeIndex = $state(0);
  // Options the user got wrong AND confirmed with "Try again". Grows across
  // attempts within a challenge; cleared only when the challenge restarts.
  let disabledOptionIds = $state(/** @type {string[]} */ ([]));
  let overlay = $state(/** @type {null | 'incorrect' | 'correct'} */ (null));
  // The option just tapped, so "Try again" knows which id to disable.
  let lastSelectedOptionId = $state(/** @type {string | null} */ (null));
  // Clues sits on top of whatever is showing and is tracked separately from
  // `overlay`, so closing it returns to the state underneath rather than
  // dismissing an incorrect/correct panel the user hasn't answered yet.
  let cluesOpen = $state(false);

  let challenge = $derived(challenges[currentChallengeIndex]);
  // The reveal panel shows the winning fluke, so derive it from correctOptionId
  // rather than repeating the answer in the data.
  let correctImage = $derived(
    challenge.options.find((o) => o.id === challenge.correctOptionId).imageName
  );

  function resetChallenge() {
    disabledOptionIds = [];
    overlay = null;
    lastSelectedOptionId = null;
    cluesOpen = false;
  }

  /** @param {string} id */
  function selectOption(id) {
    lastSelectedOptionId = id;
    overlay = id === challenge.correctOptionId ? 'correct' : 'incorrect';
  }

  function tryAgain() {
    if (lastSelectedOptionId && !disabledOptionIds.includes(lastSelectedOptionId)) {
      disabledOptionIds = [...disabledOptionIds, lastSelectedOptionId];
    }
    overlay = null;
    lastSelectedOptionId = null;
  }

  function nextChallenge() {
    if (currentChallengeIndex < challenges.length - 1) {
      currentChallengeIndex += 1;
    } else {
      // Only whales #1-#2 are built; the design has four. Loop back to the
      // attract screen so the prototype stays demoable end to end.
      currentChallengeIndex = 0;
      screen = 'attract';
    }
    resetChallenge();
  }
</script>

<Stage>
  {#if screen === 'attract'}
    <Attract onBegin={() => { screen = 'challenge'; resetChallenge(); }} />
  {:else}
    <ChallengeScreen
      {challenge}
      {disabledOptionIds}
      onSelect={selectOption}
      onClues={() => (cluesOpen = true)}
    />

    {#if overlay === 'incorrect'}
      <IncorrectOverlay onTryAgain={tryAgain} onClues={() => (cluesOpen = true)} />
    {:else if overlay === 'correct'}
      <CorrectOverlay reveal={challenge.correctReveal} image={correctImage} onNext={nextChallenge} />
    {/if}

    {#if cluesOpen}
      <CluesOverlay onClose={() => (cluesOpen = false)} />
    {/if}
  {/if}
</Stage>
