<script lang="ts">
  import TournamentCard from "$lib/components/tournament/TournamentCard.svelte";

  export let data;
</script>

<div class="mx-10 mb-12">
  <div class="container mx-auto">
    <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
      Your tournaments
    </div>

    <div class="flex flex-col items-center gap-8">
      {#each data.tournaments as tournament}
        <TournamentCard {tournament} />
      {/each}
    </div>
  </div>
</div>
