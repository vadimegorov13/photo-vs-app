<script lang="ts">
  import type { Tournament, UserTournament } from "$lib/types";

  export let tournament: Tournament;
  export let userTournament: UserTournament | undefined;

  let state = tournament.expand.state.state;
  let ready = tournament.expand.registeredUsers.every((userTournament) => userTournament.ready);
</script>

<div class="rounded-sm shadow-lg p-4 border-t-8 border-primary w-full space-y-2">
  <h1 class="text-2xl font-semibold prevent-overflow">
    {tournament.title.length > 32 ? tournament.title.slice(0, 32) + "..." : tournament.title}
  </h1>
  {#if state === "NOT_STARTED"}
    {#if ready && tournament.expand.registeredUsers.length > 1}
      <p class="badge badge-success my-auto">ready to start</p>
    {:else}
      <p class="badge badge-warning my-auto">waiting for players</p>
    {/if}
  {:else if state === "FINISHED"}
    <p class="badge my-auto">finished</p>
  {:else if state === "IN_PROGRESS"}
    <p class="badge badge-success my-auto">in progress</p>
  {/if}
  <div class="divider m-0" />
  <div>
    <p class="text-md text-gray-600 prevent-overflow">
      {tournament.description.length > 32
        ? tournament.description.slice(0, 32) + "..."
        : tournament.description}
    </p>
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
</div>

<style>
  .prevent-overflow {
    overflow-wrap: break-word;
    max-width: 100%;
  }
</style>
