<script>
  import { onMount } from 'svelte';
  import challenges from './lib/challenges.json';
  import Stage from './lib/Stage.svelte';
  import Attract from './lib/Attract.svelte';
  import ChallengeScreen from './lib/ChallengeScreen.svelte';
  import IncorrectOverlay from './lib/IncorrectOverlay.svelte';
  import CorrectOverlay from './lib/CorrectOverlay.svelte';
  import CluesOverlay from './lib/CluesOverlay.svelte';

  // Build config comes from .env files (see .env, .env.web, .env.review,
  // .env.kiosk). Run with: npm run dev | dev:local | dev:review | dev:kiosk
  const isAttract = import.meta.env.VITE_ATTRACT === 'true';

  const ATTRACT_TIMEOUT = 120_000; // inactivity delay before returning to attract

  let screen = $state(/** @type {'attract' | 'challenge'} */ (isAttract ? 'attract' : 'challenge'));
  // Kept as real state rather than a constant so adding whales #3-#4 is a drop-in.
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

  let timeoutId = /** @type {number | undefined} */ (undefined);

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

  function goToAttract() {
    currentChallengeIndex = 0;
    screen = 'attract';
    resetChallenge();
  }

  function resetTimeout() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(goToAttract, ATTRACT_TIMEOUT);
  }

  function handleUserActivity() {
    if (screen !== 'attract') resetTimeout();
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
      resetChallenge();
    } else {
      // Only whales #1-#2 are built; the design has four. In attract builds fall
      // back to the attract loop, otherwise start over from the first whale.
      if (isAttract) goToAttract();
      else { currentChallengeIndex = 0; resetChallenge(); }
    }
  }

  onMount(() => {
    if (!isAttract) return;

    window.addEventListener('click', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearTimeout(timeoutId);
    };
  });
</script>

<Stage>
  {#if screen === 'attract'}
    <Attract onBegin={() => { screen = 'challenge'; resetChallenge(); resetTimeout(); }} />
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
