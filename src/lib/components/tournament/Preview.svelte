<script lang="ts">
  import { Alert, SubmissionCard, TournamentDetails, UserCard } from "$lib/components";
  import type { Tournament, UserTournament } from "$lib/types";
  import { Folder, Icon, UserGroup } from "svelte-hero-icons";

  export let form: any;
  export let tournament: Tournament;
  export let userTournament: UserTournament | undefined;
</script>

<div class="flex flex-col mt-8 mx-auto max-w-4xl">
  <div class="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
    <TournamentDetails {tournament} {userTournament} />

    <div class="rounded-sm shadow-lg p-4 border-t-8 border-primary w-full md:w-3/5">
      <div class="flex place-content-center">
        <span class="text-xl pt-2">Participants</span>
        <span>
          <Icon class="w-8 ml-2" src={UserGroup} />
        </span>
      </div>
      {#if tournament.expand.state.state === "NOT_STARTED"}
        <p
          class="text-xs text-center {tournament.expand.registeredUsers.filter(
            (userTournament) => userTournament.ready
          ).length === tournament.expand.registeredUsers.length &&
          tournament.expand.registeredUsers.length > 1
            ? 'text-success'
            : 'text-warning'}"
        >
          {tournament.expand.registeredUsers.filter((userTournament) => userTournament.ready)
            .length} out of {tournament.expand.registeredUsers.length} are ready
        </p>
      {/if}
      <div class="divider mt-2 mb-0" />
      {#each tournament.expand.registeredUsers as userTournament, id}
        {#if id !== 0}
          <div class="divider my-0" />
        {/if}
        <UserCard {userTournament} state={tournament.expand.state.state} />
      {/each}
    </div>
  </div>
</div>

{#if userTournament}
  <div class="flex flex-col mt-4 mx-auto max-w-4xl">
    <div class="rounded-sm shadow-lg p-4 border-t-8 border-primary">
      <div class="flex place-content-center">
        <span class="text-xl pt-2">Your Submissions</span>
        <span>
          <Icon class="w-8 ml-2" src={Folder} />
        </span>
      </div>
      <p class="text-center text-xs text-gray-500">
        You've submitted
        <slug>{userTournament.submissions.length}</slug>
        {userTournament.submissions.length === 1 ? "photo" : "photos"}
      </p>
      {#if userTournament.expand.submissions}
        <div class="divider my-2" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each userTournament.expand.submissions as submission}
            <SubmissionCard
              {userTournament}
              {submission}
              state={tournament.expand.state.state}
            />
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

{#if form}
  {#if form?.errors}
    <Alert>
      {#if form.errors?.title}
        {form.errors?.title[0]}
      {/if}
      {#if form.errors?.description}
        {form.errors?.description[0]}
      {/if}
      {#if form.errors?.message}
        {form.errors.message}
      {/if}
    </Alert>
  {/if}
  {#if form?.success === true}
    <Alert alertType="success">
      {form.message}
    </Alert>
  {/if}
{/if}
