<script lang="ts">
  import type { Tournament } from "$lib/types";
  import { ActionButtons, UserCard, SubmissionCard, Alert } from "$lib/components";
  import { Icon, UserGroup, Folder } from "svelte-hero-icons";

  export let form: any;
  export let tournament: Tournament;
  export let userId: string;

  let userTournament = tournament.expand.registeredUsers.find(
    (userTournament) => userTournament.expand.user.id === userId
  );
  let readyUsersNumber = tournament.expand.registeredUsers.filter(
    (userTournament) => userTournament.ready
  ).length;
</script>

<div class="flex flex-col mt-10 mx-auto max-w-4xl">
  {#if form?.error}
    <div class="flex flex-col font-semibold mb-10">
      <Alert>
        <p>{form.error.message}</p>
      </Alert>
    </div>
  {/if}

  <div class="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
    <div class="rounded-sm shadow-lg p-4 border-t-8 border-primary w-full space-y-2">
      <h1 class="text-4xl text-center font-semibold">{tournament.title}</h1>
      <p class="text-md text-gray-500">{tournament.description}</p>
      <div class="divider m-0" />
      <div>
        <h2 class="text-center mb-2 font-semibold">Settings</h2>
        <div class="grid grid-cols-2">
          <p class="badge badge-lg badge-outline w-44 mx-auto my-2">
            Max Participants: {tournament.expand.settings.maxPlayers}
          </p>
          <p class="badge badge-lg badge-outline w-44 mx-auto my-2">
            Max Submissions: {tournament.expand.settings.maxSubmissions}
          </p>
          <p class="badge badge-lg badge-outline w-44 mx-auto my-2">
            Voting Time: {tournament.expand.settings.voteTime}s
          </p>
          {#if userTournament}
            <p class="badge badge-lg badge-outline w-44 mx-auto my-2">
              Join Code: {tournament.joinCode}
            </p>
          {/if}
        </div>
      </div>
      <div class="divider m-0" />

      <ActionButtons {tournament} {userId} {userTournament} />
    </div>

    <div class="rounded-sm shadow-lg p-4 border-t-8 border-primary w-full md:w-3/5">
      <div class="pb-2 flex place-content-center">
        <span class="text-xl pt-2">Participants</span>
        <span>
          <Icon class="w-8 ml-2" src={UserGroup} />
        </span>
      </div>
      <p
        class="text-xs text-center {readyUsersNumber === tournament.expand.registeredUsers.length
          ? 'text-success'
          : 'text-gray-500'}"
      >
        {readyUsersNumber} out of {tournament.expand.registeredUsers.length} are ready
      </p>

      {#each tournament.expand.registeredUsers as userTournament}
        <div class="divider m-0" />
        <UserCard {userTournament} />
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
      {#if form?.type === "submission"}
        {#if form?.errors}
          <Alert>
            {#if form?.errors?.title}
              {form?.errors?.title[0]}
            {/if}
            {#if form?.errors?.description}
              {form?.errors?.description[0]}
            {/if}
          </Alert>
        {/if}
        {#if form?.success === true}
          <Alert alertType="success">
            {form.message}
          </Alert>
        {/if}
      {/if}
      {#if userTournament.expand.submissions}
        <div class="grid grid-cols-1 md:grid-cols-2 space-y-4 space-x-0 md:space-x-4 md:space-y-0">
          {#each userTournament.expand.submissions as submission}
            <SubmissionCard {submission} tournamentId={tournament.id} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}
