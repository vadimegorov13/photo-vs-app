<script lang="ts">
  import { Alert, SubmissionCard, TournamentDetails, UserCard } from "$lib/components";
  import type { Tournament, UserTournament } from "$lib/types";
  import { Folder, Icon, UserGroup } from "svelte-hero-icons";

  export let form: any;
  export let tournament: Tournament;
  export let userTournament: UserTournament | undefined;

  let readyUsersNumber = tournament.expand.registeredUsers.filter(
    (userTournament) => userTournament.ready
  ).length;

  let state = tournament.expand.state.tournamentState;
</script>

<div class="flex flex-col mt-8 mx-auto max-w-4xl">
  {#if form}
    <div class="mb-2">
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
    </div>
  {/if}

  <div class="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
    <TournamentDetails {tournament} {userTournament} />

    <div class="rounded-sm shadow-lg p-4 border-t-8 border-primary w-full md:w-3/5">
      <div class="pb-2 flex place-content-center">
        <span class="text-xl pt-2">Participants</span>
        <span>
          <Icon class="w-8 ml-2" src={UserGroup} />
        </span>
      </div>
      {#if state === "NOT_STARTED"}
        <p
          class="text-xs text-center {readyUsersNumber === tournament.expand.registeredUsers.length
            ? 'text-success'
            : 'text-gray-500'}"
        >
          {readyUsersNumber} out of {tournament.expand.registeredUsers.length} are ready
        </p>
      {/if}

      {#each tournament.expand.registeredUsers as userTournament}
        <div class="divider m-0" />
        <UserCard {userTournament} {state}/>
      {/each}
    </div>
  </div>
</div>

{#if userTournament}
  <div class="flex flex-col mt-4 mx-auto max-w-4xl">
    <div class="rounded-sm shadow-lg p-4 border-t-8 border-primary space-y-2">
      <div class="pb-2 flex place-content-center">
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each userTournament.expand.submissions as submission}
            <SubmissionCard {submission} {state}/>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}
