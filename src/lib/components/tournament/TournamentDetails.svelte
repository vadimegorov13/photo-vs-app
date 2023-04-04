<script lang="ts">
  import { ActionButtons } from "$lib/components";
  import type { Tournament, UserTournament } from "$lib/types";

  export let tournament: Tournament;
  export let userTournament: UserTournament | undefined;
  export let showPhotosButton: boolean = false;
</script>

<div class="flex flex-col rounded-sm shadow-lg p-4 border-t-8 border-primary w-full space-y-2">
  <h1 class="text-3xl font-semibold prevent-overflow md:max-w-[22rem] lg:max-w-[30rem]">
    {tournament.title}
  </h1>
  {#if tournament.expand.state.tournamentState === "NOT_STARTED"}
    {#if tournament.expand.registeredUsers.every((userTournament) => userTournament.ready) && tournament.registeredUsers.length > 1}
      <p class="badge badge-success my-auto">ready to start</p>
    {:else}
      <p class="badge badge-warning my-auto">waiting for players</p>
    {/if}
  {:else if tournament.expand.state.tournamentState === "FINISHED"}
    <p class="badge my-auto">finished</p>
  {:else if tournament.expand.state.tournamentState === "IN_PROGRESS"}
    <p class="badge badge-success my-auto">in progress</p>
  {/if}
  <div class="divider m-0" />
  <div>
    <p class="text-md text-gray-600">{tournament.description}</p>
    <div class="text-sm">
      <p class="badge badge-lg badge-outline mx-auto mt-2 text-sm">
        max participants: {tournament.expand.settings.maxPlayers}
      </p>
      <p class="badge badge-lg badge-outline mx-auto mt-2 text-sm">
        max submissions: {tournament.expand.settings.maxSubmissions}
      </p>
      <p class="badge badge-lg badge-outline mx-auto mt-2 text-sm">
        voting time: {tournament.expand.settings.voteTime}s
      </p>
      {#if userTournament}
        <p class="badge badge-lg badge-outline mx-auto mt-2 text-sm">
          join code: {tournament.joinCode}
        </p>
      {/if}
    </div>
  </div>
  <div class="w-full grow">

  </div>

  <div class="divider m-0" />
  <ActionButtons {tournament} {userTournament} showPhotos={showPhotosButton} />
</div>

<style>
  .prevent-overflow {
    overflow-wrap: break-word;
    white-space: normal;
  }
</style>
