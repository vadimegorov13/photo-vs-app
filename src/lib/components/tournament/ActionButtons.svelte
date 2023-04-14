<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { DeleteTournament, ValidatedInput } from "$lib/components";
  import { copyToClipBoard } from "$lib/helpers";
  import type { Tournament, UserTournament } from "$lib/types";
  import { Check, DocumentArrowUp, Icon, Link, Play, UserPlus, XMark } from "svelte-hero-icons";

  export let userTournament: UserTournament | undefined;
  export let tournament: Tournament;

  let loading = false;

  const enhanceForm = () => {
    loading = true;
    return async ({ result }: any) => {
      if (result.type === "success") {
        await invalidateAll();
      }
      loading = false;
      if (result.type !== "success") {
        await applyAction(result);
      }
    };
  };
</script>

<div class="flex flex-row">
  <button
    on:click={() => copyToClipBoard(tournament.id)}
    class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12"
  >
    <div class="flex flex-col">
      <Icon src={Link} class="w-8 h-8 mx-auto" />
      share
    </div>
    <div id="clipboard" />
  </button>

  <div
    class="divider divider-horizontal mx-auto {tournament.expand.state.state === 'IN_PROGRESS'
      ? 'hidden'
      : ''}"
  />
  {#if userTournament && tournament.expand.state.state === "NOT_STARTED"}
    <div class="mx-auto">
      <div class="flex flex-row">
        {#if tournament.host !== userTournament.user}
          <form
            method="POST"
            action="?/{!userTournament.ready ? 'ready' : 'unready'}"
            use:enhance={enhanceForm}
          >
            <ValidatedInput
              id="userTournamentId"
              type="text"
              label="userTournamentId"
              value={userTournament.id}
              hidden
              disabled={loading}
            />
            <ValidatedInput
              id="tournamentStateId"
              type="text"
              label="tournamentStateId"
              value={tournament.state}
              hidden
              disabled={loading}
            />
            <button
              type="submit"
              class="btn rounded-sm text-xs lowercase px-2 w-12
              {userTournament.submissions.length > 0 ? 'btn-ghost' : 'btn-disabled'}"
              disabled={loading}
            >
              <div class="flex flex-col">
                <Icon src={!userTournament.ready ? Check : XMark} class="w-8 h-8 mx-auto" />
                ready
              </div>
            </button>
          </form>
        {/if}
        {#if userTournament.submissions.length < tournament.expand.settings.maxSubmissions}
          <a href="/tournament/submission/{tournament.id}">
            <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
              <div class="flex flex-col">
                <Icon src={DocumentArrowUp} class="w-8 h-8 mx-auto" />
                submit
              </div>
            </button>
          </a>
        {/if}
        {#if tournament.host === userTournament.user}
          <form method="POST" action="?/start" use:enhance={enhanceForm}>
            <ValidatedInput
              id="tournamentId"
              type="text"
              label="tournamentId"
              value={tournament.id}
              hidden
              disabled={loading}
            />
            <ValidatedInput
              id="userTournamentId"
              type="text"
              label="userTournamentId"
              value={userTournament.id}
              hidden
              disabled={loading}
            />
            <button
              type="submit"
              class="btn rounded-sm text-xs lowercase px-2 w-12
              {tournament.expand.registeredUsers.every((userTournament) => userTournament.ready) &&
              (userTournament.submissions.length > 1 ||
                (userTournament.submissions.length > 0 && tournament.registeredUsers.length > 1))
                ? 'btn-success'
                : 'btn-disabled'}"
              disabled={loading}
            >
              <div class="flex flex-col">
                <Icon src={Play} class="w-8 h-8 mx-auto" />
                start
              </div>
            </button>
          </form>
        {/if}
      </div>
    </div>

    <div class="divider divider-horizontal mx-auto" />
  {/if}

  {#if userTournament && (tournament.expand.state.state === "NOT_STARTED" || tournament.expand.state.state === "FINISHED")}
    {#if tournament.host === userTournament.user}
      <DeleteTournament id={tournament.id} />
    {:else}
      <DeleteTournament
        id={userTournament.id}
        label="leave-tournament"
        title="Leave this tournament?"
        action="?/leave"
      />
    {/if}
  {:else if tournament.expand.state.state === "NOT_STARTED"}
    <form method="POST" action="?/join" use:enhance={enhanceForm}>
      <input type="text" name="id" class="input" value={tournament.id} hidden disabled={loading} />
      <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12" disabled={loading}>
        <div class="flex flex-col">
          <Icon src={UserPlus} class="w-8 h-8 mx-auto" />
          join
        </div>
      </button>
    </form>
  {/if}
</div>
