<script lang="ts">
  import { DeleteTournament, ValidatedInput } from "$lib/components";
  import { copyToClipBoard } from "$lib/helpers";
  import type { Tournament, UserTournament } from "$lib/types";
  import {
    Check,
    DocumentArrowUp,
    Folder,
    Icon,
    Link,
    Play,
    UserPlus,
    XMark,
  } from "svelte-hero-icons";

  export let userTournament: UserTournament | undefined;
  export let tournament: Tournament;
  export let showPhotos: boolean = false;
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
    class="divider divider-horizontal mx-auto {tournament.expand.state.state ===
    'IN_PROGRESS'
      ? 'hidden'
      : ''}"
  />

  {#if userTournament && tournament.expand.state.state === "NOT_STARTED"}
    <div class="mx-auto">
      <div class="flex flex-row">
        {#if !userTournament.ready}
          <form method="POST" action="/tournament/{tournament.id}?/ready">
            <ValidatedInput
              id="userTournamentId"
              type="text"
              label="userTournamentId"
              value={userTournament.id}
              hidden
            />
            <button type="submit" class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
              <div class="flex flex-col">
                <Icon src={Check} class="w-8 h-8 mx-auto" />
                ready
              </div>
            </button>
          </form>
        {:else}
          <form method="POST" action="/tournament/{tournament.id}?/unready">
            <ValidatedInput
              id="userTournamentId"
              type="text"
              label="userTournamentId"
              value={userTournament.id}
              hidden
            />
            <button type="submit" class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
              <div class="flex flex-col">
                <Icon src={XMark} class="w-8 h-8 mx-auto" />
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
        {#if userTournament.submissions.length > 0 && showPhotos}
          <a href="/tournament/{tournament.id}">
            <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
              <div class="flex flex-col">
                <Icon src={Folder} class="w-8 h-8 mx-auto" />
                photos
              </div>
            </button>
          </a>
        {/if}
        {#if tournament.host === userTournament.user}
          <form method="POST" action="/tournament/{tournament.id}?/start">
            <ValidatedInput
              id="tournamentId"
              type="text"
              label="tournamentId"
              value={tournament.id}
              hidden
            />
            <ValidatedInput
              id="userTournamentId"
              type="text"
              label="userTournamentId"
              value={userTournament.id}
              hidden
            />
            <button
              type="submit"
              class="btn rounded-sm text-xs lowercase px-2 w-12
              {tournament.expand.registeredUsers.every((userTournament) => userTournament.ready) &&
              tournament.registeredUsers.length > 1
                ? 'btn-success'
                : 'btn-disabled'}"
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
        action="/tournament/{tournament.id}?/leave"
      />
    {/if}
  {:else if tournament.expand.state.state === "NOT_STARTED"}
    <form method="POST" action="/tournament/{tournament.id}?/join">
      <input type="text" name="id" class="input" value={tournament.id} hidden />
      <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
        <div class="flex flex-col">
          <Icon src={UserPlus} class="w-8 h-8 mx-auto" />
          join
        </div>
      </button>
    </form>
  {/if}
</div>
