<script lang="ts">
  import type { Tournament } from "$lib/types";
  import { Icon, UserGroup } from "svelte-hero-icons";
  import { UserCard } from "$lib/components";

  export let tournament: Tournament;
</script>

<div class="rounded-sm shadow-lg p-4 border-t-8 border-primary w-full md:w-3/5">
  <div class="flex place-content-center">
    <span class="text-xl pt-2">Participants</span>
    <span>
      <Icon class="w-8 ml-2" src={UserGroup} />
    </span>
  </div>
  {#if tournament.expand.state.state === "NOT_STARTED"}
  <div class="flex place-content-center mt-2">
    <p
      class="text-xs text-center badge {tournament.expand.registeredUsers.filter(
        (userTournament) => userTournament.ready
      ).length === tournament.expand.registeredUsers.length &&
      tournament.expand.registeredUsers.length > 1
        ? 'badge-success'
        : 'badge-warning'}"
    >
      {tournament.expand.registeredUsers.filter((userTournament) => userTournament.ready).length} out
      of {tournament.expand.registeredUsers.length} are ready
    </p>
</div>
  {/if}
  <div class="divider mt-2 mb-0" />
  {#each tournament.expand.registeredUsers as userTournament, id}
    {#if id !== 0}
      <div class="divider my-0" />
    {/if}
    <UserCard
      {userTournament}
      state={tournament.expand.state.state}
      host={userTournament.user === tournament.host}
    />
  {/each}
</div>
