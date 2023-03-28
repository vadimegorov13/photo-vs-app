<script lang="ts">
  import { TournamentCard } from "$lib/components/tournament";

  export let data;
</script>

<div class="mx-10 mb-12">
  <div class="container mx-auto">
    {#if !data.tournaments}
      <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
        You have no tournaments yet
      </div>
      <div class="grid sm:grid-cols-2 gap-8">
        <a href="/tournament/create" class="flex flex-col w-full">
          <button class="btn btn-primary"> Create Tournament </button>
        </a>
        <a href="/tournament/join" class="flex flex-col w-full">
          <button class="btn btn-secondary"> Join Tournament </button>
        </a>
      </div>
    {:else}
      <div class="flex flex-row mt-8">
        <div class="text-2xl font-medium pl-4 pt-2">Your tournaments</div>
      </div>

      <div class="divider" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.tournaments as tournament}
          <TournamentCard {tournament} user={data.user} />
        {/each}
      </div>
    {/if}
  </div>
</div>
