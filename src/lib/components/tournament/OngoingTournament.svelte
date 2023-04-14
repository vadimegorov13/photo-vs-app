<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { RealtimeSubscriber, ValidatedInput, VoteSubmission } from "$lib/components";
  import { getImageUrl, serializeNonPOJOs } from "$lib/helpers";
  import type { Match, Round, Submission, Tournament, UserTournament, UserVote } from "$lib/types";

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
    state.currentRound.currentMatch";

  let currentRound: Round | undefined = undefined;
  let currentMatch: Match | undefined = undefined;
  let submission1: Submission | null = null;
  let submission2: Submission | null = null;
  let matchTotal: number = 0;
  let votes1: string[] = [];
  let votes2: string[] = [];
  let imageUrls: string[] = [];
  let voted: string | null = null;

  const updateTournamentData = () => {
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
    votes1 = currentMatch?.userVotes1 ?? [];
    votes2 = currentMatch?.userVotes2 ?? [];
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

    console.log(tournament.expand.state.state);
    console.log(tournament);
  };

  updateTournamentData();

  const handleUpdate = (updatedData: any) => {
    tournament = updatedData;
    updateTournamentData();
    if (tournament.expand.state.state === "FINISHED") {
      onFinish(serializeNonPOJOs(tournament));
    }
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

<div class="bg-white my-6 grid grid-cols-3 w-full">
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

{#if currentMatch && submission1 && submission2}
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
