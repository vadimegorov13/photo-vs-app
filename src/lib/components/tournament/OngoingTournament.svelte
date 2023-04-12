<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { RealtimeSubscriber, ValidatedInput, VoteSubmission } from "$lib/components";
  import { getImageUrl } from "$lib/helpers";
  import type { Match, Round, Submission, Tournament, UserTournament, UserVote } from "$lib/types";

  export let tournament: Tournament;
  export let userTournament: UserTournament;

  const userId = userTournament.user;
  const expand: string =
    "registeredUsers, registeredUsers.user, \
    state, settings, host, registeredUsers.submissions, \
    state.rounds, state.rounds.matches, state.rounds.matches, \
    state.rounds.matches.submission1, state.rounds.matches.submission2, \
    state.rounds.matches.userVotes1, state.rounds.matches.userVotes2";

  let currentRound: Round | undefined = undefined;
  let currentMatch: Match | undefined = undefined;
  let submission1: Submission | null = null;
  let submission2: Submission | null = null;
  let votes1: string[] = [];
  let votes2: string[] = [];
  let imageUrls: string[] = [];
  let voted: boolean = false;

  const updateTournamentData = () => {
    currentRound = tournament.expand.state.expand.rounds.find(
      (round) => round.id === tournament.expand.state.currentRound
    );
    currentMatch = currentRound?.expand.matches.find(
      (match) => match.id === currentRound?.currentMatch
    );
    submission1 = currentMatch?.expand.submission1 ?? null;
    submission2 = currentMatch?.expand.submission2 ?? null;
    votes1 = currentMatch?.userVotes1 ?? [];
    votes2 = currentMatch?.userVotes2 ?? [];
    imageUrls = [
      submission1 ? getImageUrl(submission1.collectionId, submission1.id, submission1.image) : "",
      submission2 ? getImageUrl(submission2.collectionId, submission2.id, submission2.image) : "",
    ];
    voted =
      (currentMatch?.expand.userVotes1?.some((vote: UserVote) => vote.user === userId) ?? false) ||
      (currentMatch?.expand.userVotes2?.some((vote: UserVote) => vote.user === userId) ?? false);
  };

  updateTournamentData();

  const handleUpdate = (updatedData: any) => {
    tournament = updatedData;
    updateTournamentData();
  };

  let loading = false;

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
</script>

<RealtimeSubscriber
  collectionName="tournamentState"
  id={tournament.state}
  relationName="tournament"
  relationId={tournament.id}
  {expand}
  onUpdate={handleUpdate}
/>

{#if currentMatch}
  <RealtimeSubscriber
    collectionName="match"
    id={currentMatch.id}
    relationName="tournament"
    relationId={tournament.id}
    {expand}
    onUpdate={handleUpdate}
  />
{/if}

{#if currentRound}
  <RealtimeSubscriber
    collectionName="round"
    id={currentRound.id}
    relationName="tournament"
    relationId={tournament.id}
    {expand}
    onUpdate={handleUpdate}
  />
{/if}

<div class="bg-white p-6">
  <h1 class="text-4xl text-center text-primary font-semibold mb-4">
    {tournament.title}
  </h1>
  <h2 class="text-2xl text-center text-gray-700 font-medium mb-2">
    Round {tournament.expand.state.expand.rounds.findIndex(
      (round) => round.id === currentRound?.id
    ) + 1}/{tournament.expand.state.expand.rounds.length}
  </h2>
  <!-- <h2 class="text-xl text-center text-gray-600 font-medium">
    Match {matchCount}/{matchTotal}
  </h2> -->
</div>

{#if currentMatch && submission1 && submission2}
  <div class="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-10">
    <VoteSubmission
      submission={submission1}
      votes={votes1}
      imageUrls={imageUrls[0]}
      matchId={currentMatch.id}
      {voted}
    />
    <p class="text-center text-3xl text-primary m-6">VS</p>
    <VoteSubmission
      submission={submission2}
      votes={votes2}
      imageUrls={imageUrls[1]}
      matchId={currentMatch.id}
      {voted}
    />
  </div>
{/if}

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
    <div class=" mt-4">
      <button class="btn btn-primary w-full rounded-sm" disabled={loading}>Next</button>
    </div>
  </form>
{/if}