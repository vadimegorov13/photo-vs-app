<script lang="ts">
  import type { Submission, Tournament, UserTournament } from "$lib/types";
  import { Folder, Icon } from "svelte-hero-icons";
  import { SubmissionCard } from "$lib/components";

  export let tournament: Tournament;

  let winner = tournament.expand.state.expand.currentRound.expand.currentMatch.winner;

  // get a total number of submissions for the tournament
  let totalSubmissions = tournament.expand.registeredUsers.reduce((acc, userTournament) => {
    return acc + userTournament.submissions.length;
  }, 0);

  // get a list of participants
  let participants: UserTournament[] = tournament.expand.registeredUsers.map(
    (userTournament) => userTournament
  );

  // extruct

  // get a list of all submissions for the tournament
  let submissions = tournament.expand.registeredUsers.reduce<Submission[]>(
    (acc, userTournament) => {
      return [...acc, ...userTournament.expand.submissions];
    },
    []
  );

  // find winner in submissions and then pop it to the top of the array
  let winnerSubmission = submissions.find((submission) => submission.id === winner);
  if (winnerSubmission) {
    submissions.splice(submissions.indexOf(winnerSubmission), 1);
    submissions.unshift(winnerSubmission);
  }
</script>

<div class="flex place-content-center">
  <span class="text-xl pt-2">All Submissions</span>
  <span>
    <Icon class="w-8 ml-2" src={Folder} />
  </span>
</div>
<p class="text-center text-xs text-gray-500">
  <slug>{totalSubmissions}</slug> submissions in total
</p>
<div class="divider my-2" />

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each submissions as submission}
    <SubmissionCard {submission} state={tournament.expand.state.state} {winner} />
  {/each}
</div>
