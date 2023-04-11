<script lang="ts">
  import { Preview, RealtimeSubscriber } from "$lib/components";
  import OngoingTournament from "$lib/components/tournament/OngoingTournament.svelte";
  export let data: any;
  export let form;

  const expand: string =
    "registeredUsers, registeredUsers.user, \
        state, settings, host, registeredUsers.submissions, \
        state.rounds, state.rounds.matches, state.rounds.matches, \
        state.rounds.matches.submission1, state.rounds.matches.submission2";

  const handleUpdate = (updatedData: any) => {
    data.props.tournament = updatedData;
  };
</script>

<div class="mx-2 md:mx-10">
  {#if data.success}
    <RealtimeSubscriber
      collectionName="tournament"
      id={data.props.tournament.id}
      {expand}
      onUpdate={handleUpdate}
    />
    <RealtimeSubscriber
      collectionName="tournamentState"
      id={data.props.tournament.state}
      relationName="tournament"
      relationId={data.props.tournament.id}
      {expand}
      onUpdate={handleUpdate}
    />

    {#each data.props.tournament.registeredUsers as userTournament}
      <RealtimeSubscriber
        collectionName="userTournament"
        id={userTournament}
        relationName="tournament"
        relationId={data.props.tournament.id}
        {expand}
        onUpdate={handleUpdate}
      />
    {/each}
    {#if data.props.tournament.expand.state.tournamentState === "IN_PROGRESS" && data.props.userTournament}
      <OngoingTournament tournament={data.props.tournament} />
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
