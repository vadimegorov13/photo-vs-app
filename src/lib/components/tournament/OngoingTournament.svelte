<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { RealtimeSubscriber, ValidatedInput, VoteSubmission } from "$lib/components";
  import { getImageUrl, getNumberSuffix, serializeNonPOJOs } from "$lib/helpers";
  import type { Match, Round, Submission, Tournament, UserTournament, UserVote } from "$lib/types";
  import { Confetti } from "svelte-confetti";

  export let tournament: Tournament;
  export let userTournament: UserTournament;
  export let onFinish: (data: any) => void;

  const userId = userTournament.user;
  const expand: string =
    "registeredUsers, registeredUsers.user, \
    state, settings, host, registeredUsers.submissions, \
    state.rounds, state.rounds.matches, state.rounds.matches, \
    state.rounds.matches.submission1, state.rounds.matches.submission2, \
    state.rounds.matches.userVotes1, state.rounds.matches.userVotes2, \
    state.currentRound.currentMatch, state.rounds.matches.winner";

  let currentRound: Round | undefined = undefined;
  let currentMatch: Match | undefined = undefined;
  let prevMatch: Match | undefined = undefined;
  let submission1: Submission | null = null;
  let submission2: Submission | null = null;
  let matchTotal: number = 0;
  let imageUrls: string[] = [];
  let voted: string | null = null;

  let showWinner: boolean = false;
  let lastMatch: boolean = false;
  let loading = false;

  let votingTime = 5;
  let intervalId: any;
  let buttonDisabled = false;

  const startTimer = () => {
    buttonDisabled = true;
    intervalId = setInterval(() => {
      votingTime--;
      if (votingTime === 0) {
        clearInterval(intervalId);
        buttonDisabled = false;
        votingTime = 5;
      }
    }, 1000);
  };

  const handleWinner = () => {
    showWinner = true;
    votingTime += 3;

    setTimeout(() => {
      showWinner = false;
      prevMatch = undefined;
    }, 3000);
  };

  const updateTournamentData = () => {
    const prevMatchId = currentMatch?.id ?? undefined;
    const prevRoundId = currentRound?.id ?? undefined;

    currentRound = tournament.expand.state.expand.rounds.find(
      (round) => round.id === tournament.expand.state.currentRound
    );
    currentMatch = currentRound?.expand.matches.find(
      (match) => match.id === currentRound?.currentMatch
    );
    submission1 = currentMatch?.expand.submission1 ?? null;
    submission2 = currentMatch?.expand.submission2 ?? null;
    matchTotal = tournament.expand.state.expand.rounds.reduce(
      (acc, round) => acc + round.expand.matches.length,
      0
    );
    imageUrls = [
      submission1 ? getImageUrl(submission1.collectionId, submission1.id, submission1.image) : "",
      submission2 ? getImageUrl(submission2.collectionId, submission2.id, submission2.image) : "",
    ];
    const userVotedInVotes1 =
      currentMatch?.expand.userVotes1?.some((vote: UserVote) => vote.user === userId) ?? false;
    const userVotedInVotes2 =
      currentMatch?.expand.userVotes2?.some((vote: UserVote) => vote.user === userId) ?? false;

    if (userVotedInVotes1) {
      voted = submission1?.id ?? null;
    } else if (userVotedInVotes2) {
      voted = submission2?.id ?? null;
    } else {
      voted = null;
    }

    prevMatch =
      tournament.expand.state.expand.rounds
        .find((round) => round.id === prevRoundId)
        ?.expand.matches.find((match) => match.id === prevMatchId) ?? undefined;

    lastMatch = tournament.expand.state.state === "FINISHED";

    if (
      prevMatch !== undefined &&
      prevMatch !== currentMatch &&
      prevMatch.winner !== undefined &&
      !showWinner &&
      !voted
    ) {
      handleWinner();
    }

    if (tournament.host === userTournament.user && voted === null) {
      startTimer();
    }

    if (lastMatch) {
      showWinner = true;
    }
  };

  const handleUpdate = (updatedData: any) => {
    tournament = updatedData;
    updateTournamentData();
  };

  const handleFinish = () => {
    showWinner = false;
    onFinish(serializeNonPOJOs(tournament));
  };

  const finilizeMatch = () => {
    loading = true;
    return async ({ result }: any) => {
      if (result.type === "success") {
        await invalidateAll();
      }
      loading = false;
      if (result.type !== "success") {
        await applyAction(result);
      }
    };
  };

  updateTournamentData();
</script>

<RealtimeSubscriber
  collectionName="tournamentState"
  id={tournament.state}
  relationName="tournament"
  relationId={tournament.id}
  {expand}
  onUpdate={handleUpdate}
/>

{#if currentMatch && submission1 && submission2 && !showWinner}
  <div class="my-6 grid grid-cols-3 w-full">
    <h2 class="text-xl text-center text-gray-600 font-medium">
      Round {tournament.expand.state.round}/{tournament.expand.state.expand.rounds.length}
    </h2>
    <h2 class="text-xl text-center text-gray-600 font-medium">
      Match {tournament.expand.state.match}/{matchTotal}
    </h2>
    <h2 class="text-xl text-center text-gray-600 font-medium">
      Votes {tournament.expand.state.votes}/{tournament.registeredUsers.length}
    </h2>
  </div>
  <div class="mx-4 flex flex-col md:flex-row justify-center items-center">
    <VoteSubmission
      submission={submission1}
      imageUrl={imageUrls[0]}
      matchId={currentMatch.id}
      {voted}
    />
    <p class="text-center text-3xl text-primary my-2 md:mx-6">VS</p>
    <VoteSubmission
      submission={submission2}
      imageUrl={imageUrls[1]}
      matchId={currentMatch.id}
      {voted}
    />
  </div>

  {#if tournament.host === userTournament.user}
    <form
      method="POST"
      class="flex flex-col items-center"
      action="?/finilizeMatch"
      use:enhance={finilizeMatch}
    >
      <ValidatedInput
        id="tournamentId"
        value={tournament.id}
        label="tournamentId"
        hidden
        disabled={loading}
      />
      <div class="mt-4 z-10">
        <button class="btn btn-primary w-full rounded-sm" disabled={loading || buttonDisabled}>
          Next {buttonDisabled ? `(${votingTime} s)` : ""}
        </button>
      </div>
    </form>
  {/if}
{/if}

{#if showWinner && prevMatch && prevMatch.winner}
  <div class="mx-4 flex flex-col justify-center items-center">
    <div class="felx flex-row justify-center w-full my-6">
      <h2 class="text-xl text-center text-gray-600 font-medium">
        {lastMatch
          ? "Winner of the tournament!"
          : `Winner of the ${getNumberSuffix(tournament.expand.state.match - 1)} match`}
      </h2>
    </div>

    <div class="border rounded-sm">
      <h1 class="text-center text-xl">{prevMatch.expand.winner.title}</h1>

      <img
        src={getImageUrl(
          prevMatch.expand.winner.collectionId,
          prevMatch.expand.winner.id,
          prevMatch.expand.winner.image
        )}
        alt="submission2"
        id="submission-{prevMatch.expand.winner.id}"
        class="w-[40rem]"
      />
      <h1 class="text-center text-md text-gray-500">{prevMatch.expand.winner.description}</h1>
    </div>

    {#if lastMatch}
      <div class="mt-4 z-10">
        <button
          class="btn btn-primary w-full rounded-sm"
          disabled={loading}
          on:click={handleFinish}
        >
          Continue
        </button>
      </div>
    {/if}
  </div>

  <div class="confetti z-0">
    <Confetti
      x={[-5, 5]}
      y={[0, 0.1]}
      delay={[100, 2000]}
      infinite
      duration="3000"
      amount="400"
      fallDistance="100vh"
    />
  </div>
{/if}

<style>
  .confetti {
    position: fixed;
    top: -50px;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
</style>
