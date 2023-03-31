<script lang="ts">
  import { ActionButtons } from "$lib/components";
  import type { Tournament, UserTournament } from "$lib/types";

  export let tournament: Tournament;
  export let userTournament: UserTournament | undefined;

  let state = tournament.expand.state.tournamentState;
  let ready = tournament.expand.registeredUsers.every((userTournament) => userTournament.ready);
</script>

<div class="rounded-sm shadow-lg p-4 border-t-8 border-primary w-full space-y-2">
  <div class="flex flex-row">
    <h1 class="text-3xl font-semibold">{tournament.title}</h1>

    {#if state === "NOT_STARTED"}
      {#if ready}
        <p class="badge badge-success my-auto ml-2">ready to start</p>
      {:else}
        <p class="badge badge-warning my-auto ml-2">waiting for players</p>
      {/if}
    {:else if state === "FINISHED"}
      <p class="badge my-auto ml-2">finished</p>
    {:else if state === "IN_PROGRESS"}
      <p class="badge badge-success my-auto ml-2">in progress</p>
    {/if}
  </div>
  <p class="text-md text-gray-500">{tournament.description}</p>
  <div class="divider m-0" />
  <div>
    <h2 class="text-center mb-2 font-semibold">Settings</h2>
    <div class="grid grid-cols-2">
      <p class="badge badge-lg badge-outline w-44 mx-auto my-2">
        Max Participants: {tournament.expand.settings.maxPlayers}
      </p>
      <p class="badge badge-lg badge-outline w-44 mx-auto my-2">
        Max Submissions: {tournament.expand.settings.maxSubmissions}
      </p>
      <p class="badge badge-lg badge-outline w-44 mx-auto my-2">
        Voting Time: {tournament.expand.settings.voteTime}s
      </p>
      {#if userTournament}
        <p class="badge badge-lg badge-outline w-44 mx-auto my-2">
          Join Code: {tournament.joinCode}
        </p>
      {/if}
    </div>
  </div>
  <div class="divider m-0" />

  <ActionButtons {tournament} {userTournament} />
</div>
