<script lang="ts">
  import { Preview, RealtimeSubscriber, OngoingTournament } from "$lib/components";
  import TournamentCard from "$lib/components/tournament/TournamentCard.svelte";
  import TournamentDetails from "$lib/components/tournament/TournamentDetails.svelte";
  export let data: any;
  export let form;
  export let ongoing = false;

  const expand: string =
    "registeredUsers, registeredUsers.user, \
        state, settings, host, registeredUsers.submissions, \
        state.rounds, state.rounds.matches, state.rounds.matches, \
        state.rounds.matches.submission1, state.rounds.matches.submission2, \
        state.rounds.matches.userVotes1, state.rounds.matches.userVotes2, \
        state.currentRound.currentMatch, state.rounds.matches.winner";

  const handleUpdate = (updatedData: any) => {
    data.props.tournament = updatedData;

    if (data.props.tournament.expand.state.state === "IN_PROGRESS" && data.props.userTournament) {
      ongoing = true;
    }
  };

  if (
    data.success &&
    data.props.tournament.expand.state.state === "IN_PROGRESS" &&
    data.props.userTournament
  ) {
    ongoing = true;
  }

  const handleFinish = (updatedData: any) => {
    handleUpdate(updatedData);
    ongoing = false;
  };
</script>

<svelte:head>
  <title>{data.success ? data.props.tournament.title : "Not found"}</title>
</svelte:head>

<div class="mx-2 md:mx-10">
  {#if data.success}
    {#if ongoing}
      <OngoingTournament
        tournament={data.props.tournament}
        userTournament={data.props.userTournament}
        onFinish={handleFinish}
      />
    {:else}
      <RealtimeSubscriber
        collectionName="tournamentState"
        id={data.props.tournament.state}
        relationName="tournament"
        relationId={data.props.tournament.id}
        {expand}
        onUpdate={handleUpdate}
      />
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
