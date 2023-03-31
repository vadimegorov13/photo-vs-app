<script lang="ts">
  import Preview from "$lib/components/tournament/Preview.svelte";
  import type { Tournament, UserTournament } from "$lib/types";
  import { onDestroy, onMount } from "svelte";
  // import PocketBase from "pocketbase";

  export let data: any;
  export let form;

  let tournament: Tournament | undefined;
  let userTournament: UserTournament | undefined;

  onMount(async () => {
    if (data.success) {
      tournament = data.tournament;
      userTournament = data.userTournament;
    }
  });

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
  {#if data.success && tournament}
    {#if tournament.expand.state.tournamentState === "IN_PROGRESS" && userTournament}
      <Preview {tournament} {userTournament} {form} />
      yo
    {:else}
      <Preview {tournament} {userTournament} {form} />
    {/if}
  {:else}
    <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
      {data.errors.message[0]}
    </div>
  {/if}
</div>
