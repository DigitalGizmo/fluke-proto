<script>
  import { onMount } from 'svelte';
  import challenges from './lib/challenges.json';
  import Stage from './lib/Stage.svelte';
  import Attract from './lib/Attract.svelte';
  import WebWelcome from './lib/WebWelcome.svelte';
  import ChallengeScreen from './lib/ChallengeScreen.svelte';
  import ConfirmOverlay from './lib/ConfirmOverlay.svelte';
  import FeedbackOverlay from './lib/FeedbackOverlay.svelte';
  import CluesOverlay from './lib/CluesOverlay.svelte';

  // Build config comes from .env files (see .env, .env.web, .env.review,
  // .env.kiosk). Run with: npm run dev | dev:local | dev:review | dev:kiosk
  const isAttract = import.meta.env.VITE_ATTRACT === 'true';

  // Idle reset exists only in the unattended builds, and always returns to the
  // attract loop — a page in an ordinary browser tab should stay put. Seconds,
  // from VITE_IDLE_TIMEOUT (set in .env.review and .env.kiosk); 0 disables.
  const IDLE_TIMEOUT = isAttract
    ? Number(import.meta.env.VITE_IDLE_TIMEOUT ?? 300) * 1000
    : 0;

  // Kiosk/review open on the attract loop; web opens on the welcome screen.
  const HOME = isAttract ? 'attract' : 'welcome';

  let screen = $state(/** @type {'attract' | 'welcome' | 'challenge'} */ (HOME));
  let currentChallengeIndex = $state(0);
  // Options the user ruled out by working through a wrong guess. Grows across
  // attempts within a challenge; cleared only when the challenge changes.
  let disabledOptionIds = $state(/** @type {string[]} */ ([]));
  // The tile currently under consideration, and how far through the two-step
  // confirm the user is. Tapping a tile only opens the question; the yes/no
  // answer is what gets judged.
  let selectedOptionId = $state(/** @type {string | null} */ (null));
  let phase = $state(/** @type {null | 'confirm' | 'feedback'} */ (null));
  let saidYes = $state(false);
  // Clues sits on top of whatever is showing and is tracked separately, so
  // closing it returns to the state underneath.
  let cluesOpen = $state(false);

  let timeoutId = /** @type {number | undefined} */ (undefined);

  let challenge = $derived(challenges[currentChallengeIndex]);
  let selectedOption = $derived(
    challenge.options.find((o) => o.id === selectedOptionId)
  );
  let isCorrectFluke = $derived(selectedOptionId === challenge.correctOptionId);
  let isLastChallenge = $derived(currentChallengeIndex === challenges.length - 1);

  // Right fluke ends the challenge either way, so the button moves the user on;
  // a wrong fluke sends them back to the grid.
  let feedbackButtonLabel = $derived(
    !isCorrectFluke ? 'Try again' : isLastChallenge ? 'Start Over' : 'Try the next whale'
  );

  function resetChallenge() {
    disabledOptionIds = [];
    selectedOptionId = null;
    phase = null;
    saidYes = false;
    cluesOpen = false;
  }

  function goHome() {
    currentChallengeIndex = 0;
    resetChallenge();
    screen = HOME;
  }

  function resetTimeout() {
    clearTimeout(timeoutId);
    if (IDLE_TIMEOUT > 0) timeoutId = setTimeout(goHome, IDLE_TIMEOUT);
  }

  function handleUserActivity() {
    if (screen !== 'attract') resetTimeout();
  }

  /** @param {string} id */
  function selectOption(id) {
    selectedOptionId = id;
    phase = 'confirm';
  }

  /** @param {boolean} yes */
  function answer(yes) {
    saidYes = yes;
    phase = 'feedback';
  }

  // The single button on the feedback panel. What it does depends only on
  // whether the tapped fluke was the match — not on the yes/no answer.
  function feedbackAction() {
    if (!isCorrectFluke) {
      if (selectedOptionId && !disabledOptionIds.includes(selectedOptionId)) {
        disabledOptionIds = [...disabledOptionIds, selectedOptionId];
      }
      selectedOptionId = null;
      phase = null;
      return;
    }

    if (isLastChallenge) {
      goHome();
    } else {
      currentChallengeIndex += 1;
      resetChallenge();
    }
    resetTimeout();
  }

  onMount(() => {
    if (IDLE_TIMEOUT <= 0) return;
    resetTimeout();

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
  {:else if screen === 'welcome'}
    <WebWelcome onBegin={() => { screen = 'challenge'; resetChallenge(); }} />
  {:else}
    <ChallengeScreen
      {challenge}
      {disabledOptionIds}
      onSelect={selectOption}
      onClues={() => (cluesOpen = true)}
      overlayOpen={phase !== null}
    />

    {#if phase === 'confirm'}
      <ConfirmOverlay image={selectedOption.imageName} onAnswer={answer} />
    {:else if phase === 'feedback'}
      <FeedbackOverlay
        image={selectedOption.imageName}
        {isCorrectFluke}
        {saidYes}
        reveal={challenge.correctReveal}
        buttonLabel={feedbackButtonLabel}
        onAction={feedbackAction}
      />
    {/if}

    {#if cluesOpen}
      <CluesOverlay onClose={() => (cluesOpen = false)} />
    {/if}
  {/if}
</Stage>
