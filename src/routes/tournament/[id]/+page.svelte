<script lang="ts">
  import Preview from "$lib/components/tournament/Preview.svelte";
  import type { Tournament } from "$lib/types";

  type Data = {
    tournament: Tournament;
    userId: string;
  };

  export let data: Data;
  export let form
</script>

<div>
  {#if data.tournament.expand.state.tournamentState === "NOT_STARTED"}
    <Preview tournament={data.tournament} userId={data.userId} {form}/>
  {:else if data.tournament.expand.state.tournamentState === "IN_PROGRESS"}
    <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
      This tournament is in progress
    </div>
  {:else if data.tournament.expand.state.tournamentState === "FINISHED"}
    <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
      This tournament has finished
    </div>
  {/if}
</div>
