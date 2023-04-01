<script lang="ts">
  import Preview from "$lib/components/tournament/Preview.svelte";
  import type { Tournament, UserTournament } from "$lib/types";
  import { onDestroy, onMount } from "svelte";
  // import PocketBase from "pocketbase";

  export let data: any;
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
  {#if data.success && data.props.tournament}
    {#if data.props.tournament.expand.state.tournamentState === "IN_PROGRESS" && data.props.userTournament}
      <Preview
        tournament={data.props.tournament}
        userTournament={data.props.userTournament}
        {form}
      />
      yo
    {:else}
      <Preview
        tournament={data.props.tournament}
        userTournament={data.props.userTournament}
        {form}
      />
    {/if}
  {:else}
    <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
      {data.errors.message[0]}
    </div>
  {/if}
</div>
