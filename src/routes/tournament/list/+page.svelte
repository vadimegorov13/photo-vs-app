<script lang="ts">
  import { TournamentCard } from "$lib/components";

  export let data;
</script>

<svelte:head>
  <title>Your Tournaments</title>
</svelte:head>

<div class="mx-10 mb-12">
  <div class="container mx-auto">
    {#if !data.props}
      <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
        You have no tournaments yet
      </div>
      <div class="grid sm:grid-cols-2 gap-8">
        <a href="/tournament/create" class="flex flex-col w-full">
          <button class="btn btn-primary rounded-sm"> Create Tournament </button>
        </a>
        <a href="/tournament/join" class="flex flex-col w-full">
          <button class="btn btn-secondary rounded-sm"> Join Tournament </button>
        </a>
      </div>
    {:else}
      <div class="flex flex-row mt-8">
        <div class="text-2xl font-medium pl-4 pt-2">Your tournaments</div>
      </div>

      <div class="divider" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#each data.props.userTournaments as userTournament}
          <a
            href="/tournament/{userTournament.expand.tournament.id}"
            class="w-full duration-300 hover:scale-105"
          >
            <TournamentCard tournament={userTournament.expand.tournament} {userTournament} />
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
