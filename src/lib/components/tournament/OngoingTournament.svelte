<script lang="ts">
  import { getImageUrl } from "$lib/helpers";
  import { client } from "$lib/pocketbase";
  import type { Tournament } from "$lib/types";
  import { onDestroy, onMount } from "svelte";
  import { RealtimeSubscriber } from "..";
  import VoteSubmission from "../submission/VoteSubmission.svelte";

  export let tournament: Tournament;

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

  const handleUpdate = (updatedData: any) => {
    console.log("match updated")
    tournament = updatedData;
  };


  let unsubscribe: () => void;

  const subscribeToRecord = async () => {
    try {
      // Subscribe to realtime updates
      unsubscribe = await client
        .collection("match")
        .subscribe("9qzcba2jpd68kax", async ({ action }) => {
          console.log(action)
        });
      // Fetch the record
    } catch (error) {
      console.log(error);
    }
  };

  onMount(subscribeToRecord);

  // Unsubscribe from realtime updates
  onDestroy(() => {
    unsubscribe?.();
  });
</script>

<!-- <RealtimeSubscriber
  collectionName="match"
  id={currentMatch.id}
  relationName="tournament"
  relationId={tournament.id}
  expand="registeredUsers, registeredUsers.user, \
  state, settings, host, registeredUsers.submissions, \
  state.rounds, state.rounds.matches, state.rounds.matches, \
  state.rounds.matches.submission1, state.rounds.matches.submission2"
  onUpdate={handleUpdate}
/> -->

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
    votes={tournament.expand.state.expand.rounds[0].expand.matches[0].userVotes1}
    imageUrls={imageUrls[0]}
    matchId={currentMatch.id}
  />
  <p class="text-center text-3xl text-primary m-6">VS</p>
  <VoteSubmission
    submission={submission2}
    votes={tournament.expand.state.expand.rounds[0].expand.matches[0].userVotes2}
    imageUrls={imageUrls[1]}
    matchId={currentMatch.id}
  />
</div>
