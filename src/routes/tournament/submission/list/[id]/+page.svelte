<script lang="ts">
  import { SubmissionCard } from "$lib/components/tournament";
  import { Icon, Plus } from "svelte-hero-icons";

  export let data;
  export let form;

  let tournamentId = data.tournament.id;
</script>

<div class="mx-10 mb-12">
  <div class="container mx-auto">
    <div class="flex flex-row mt-8">
      <div class="text-2xl font-medium pl-4 pt-2">Your submissions</div>
    </div>

    <div class="divider" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each data.submissions as submission}
        <SubmissionCard {submission} {form} />
      {/each}
    </div>

    {#if data.submissions.length < data.tournament.expand.settings.maxSubmissions}
      <div class="flex flex-col w-full items-center mt-10">
        <a href={`/tournament/submission/${tournamentId}`} class="btn btn-accent btn-circle">
          <Icon src={Plus} />
        </a>
      </div>
    {/if}
  </div>
</div>
