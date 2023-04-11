<script lang="ts">
  import { RealtimeSubscriber, VoteSubmission } from "$lib/components";
  import { getImageUrl } from "$lib/helpers";
  import type { Tournament, UserTournament, UserVote } from "$lib/types";

  export let tournament: Tournament;
  export let userTournament: UserTournament;

  const expand: string =
    "registeredUsers, registeredUsers.user, \
        state, settings, host, registeredUsers.submissions, \
        state.rounds, state.rounds.matches, state.rounds.matches, \
        state.rounds.matches.submission1, state.rounds.matches.submission2, \
        state.rounds.matches.userVotes1, state.rounds.matches.userVotes2";

  let currentRound = tournament.expand.state.expand.rounds[0];
  let currentMatch = currentRound.expand.matches[0];
  let submission1 = currentMatch.expand.submission1;
  let submission2 = currentMatch.expand.submission2;
  let votes1 = currentMatch.userVotes1;
  let votes2 = currentMatch.userVotes2;
  let matchCount = 1;
  let matchTotal = tournament.expand.state.expand.rounds.reduce(
    (acc, round) => acc + round.matches.length,
    0
  );
  let imageUrls = [
    getImageUrl(submission1.collectionId, submission1.id, submission1.image),
    getImageUrl(submission2.collectionId, submission2.id, submission2.image),
  ];

  const userId = userTournament.user; // Assuming userTournament has a user field containing the user ID
  const userVotedInVotes1 = currentMatch.expand.userVotes1
    ? currentMatch.expand.userVotes1.some((vote: UserVote) => vote.user === userId)
    : false;
  const userVotedInVotes2 = currentMatch.expand.userVotes2
    ? currentMatch.expand.userVotes2.some((vote: UserVote) => vote.user === userId)
    : false;
  let voted = userVotedInVotes1 || userVotedInVotes2;

  const handleUpdate = (updatedData: any) => {
    tournament = updatedData;
    currentRound = updatedData.expand.state.expand.rounds[0];
    currentMatch = currentRound.expand.matches[0];
    votes1 = currentMatch.userVotes1;
    votes2 = currentMatch.userVotes2;

    // Check if user has voted on the current match
    const userId = userTournament.user; // Assuming userTournament has a user field containing the user ID
    const userVotedInVotes1 = currentMatch.expand.userVotes1
      ? currentMatch.expand.userVotes1.some((vote: UserVote) => vote.user === userId)
      : false;
    const userVotedInVotes2 = currentMatch.expand.userVotes2
      ? currentMatch.expand.userVotes2.some((vote: UserVote) => vote.user === userId)
      : false;

    voted = userVotedInVotes1 || userVotedInVotes2;
  };
</script>

<RealtimeSubscriber
  collectionName="match"
  id={currentMatch.id}
  relationName="tournament"
  relationId={tournament.id}
  {expand}
  onUpdate={handleUpdate}
/>

<div class="bg-white p-6">
  <h1 class="text-4xl text-center text-primary font-semibold mb-4">
    {tournament.title}
  </h1>
  <h2 class="text-2xl text-center text-gray-700 font-medium mb-2">
    Round {tournament.expand.state.expand.rounds.findIndex(
      (round) => round.id === currentRound.id
    ) + 1}/{tournament.expand.state.expand.rounds.length}
  </h2>
  <h2 class="text-xl text-center text-gray-600 font-medium">
    Match {matchCount}/{matchTotal}
  </h2>
</div>

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
<div>
  <!-- <form method="POST" class="flex flex-col items-center" action="?/vote" use:enhance={vote}>
    <ValidatedInput
      id="submissionId"
      value={submission.id}
      label="submission-{submission.id}"
      hidden
      disabled={loading}
    />
    <div class=" mt-4">
      <button class="btn btn-primary w-full rounded-sm">Vote</button>
    </div>
  </form> -->
</div>
