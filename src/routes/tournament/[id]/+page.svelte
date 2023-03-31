<script lang="ts">
  import Preview from "$lib/components/tournament/Preview.svelte";
  import type { Tournament } from "$lib/types";
  import { onDestroy, onMount } from "svelte";
  // import PocketBase from "pocketbase";

  type Data = {
    id: string;
    serverUrl: string;
    tournament: Tournament;
    userId: string;
  };

  export let data: Data;
  export let form;
  // let unsubscribe: () => void;

  // onMount(async () => {
  //   unsubscribe = await pb.collection("tournament").subscribe(data.id, async ({ action }) => {
  //     console.log(action);
  //   });
  // });

  // // Unsubscribe from realtime messages
  // onDestroy(() => {
  //   unsubscribe?.();
  // });
</script>

<div class="mx-2 md:mx-10">
  {#if data.tournament}
    {#if data.tournament.expand.state.tournamentState === "NOT_STARTED"}
      <Preview tournament={data.tournament} userId={data.userId} {form} />
    {:else if data.tournament.expand.state.tournamentState === "IN_PROGRESS"}
      <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
        This tournament is in progress
      </div>
    {:else if data.tournament.expand.state.tournamentState === "FINISHED"}
      <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
        This tournament has finished
      </div>
    {/if}
  {:else}
    <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
      This tournament does not exist
    </div>
  {/if}
</div>
