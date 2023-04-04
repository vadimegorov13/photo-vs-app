<script lang="ts">
  import { Preview, RealtimeSubscriber } from "$lib/components";
  export let data: any;
  export let form;

  const handleUpdate = (updatedData: any) => {
    data.props.tournament = updatedData;
  };
</script>

<div class="mx-2 md:mx-10">
  {#if data.success}
    <RealtimeSubscriber
      collectionName="tournament"
      id={data.props.tournament.id}
      expand="registeredUsers, registeredUsers.user, state, settings, host, registeredUsers.submissions"
      onUpdate={handleUpdate}
    />
    {#each data.props.tournament.registeredUsers as userTournament}
      <RealtimeSubscriber
        collectionName="userTournament"
        id={userTournament}
        relationName="tournament"
        relationId={data.props.tournament.id}
        expand="registeredUsers, registeredUsers.user, state, settings, host, registeredUsers.submissions"
        onUpdate={handleUpdate}
      />
    {/each}
    {#if data.props.tournament.expand.state.tournamentState === "IN_PROGRESS" && data.props.userTournament}
      <Preview
        tournament={data.props.tournament}
        userTournament={data.props.userTournament}
        {form}
      />
    {:else}
      <Preview
        tournament={data.props.tournament}
        userTournament={data.props.userTournament}
        {form}
      />
    {/if}
  {:else}
    <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
      {data.errors.message ? `${data.errors.message[0]}` : "Tournament not found"}
    </div>
  {/if}
</div>
