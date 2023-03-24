<script lang="ts">
  import SubmissionCard from "$lib/components/tournament/SubmissionCard.svelte";

  export let data;
  export let form
</script>

<div class="mx-10 mb-12">
  <div class="container mx-auto">
    {#if !data.submissions.length}
      <div class="flex flex-col items-center text-black text-3xl my-10 font-semibold">
        You have no submissions for this tournament yet
      </div>
    {:else}
      <div class="flex flex-row mt-8">
        <div class="text-2xl font-medium pl-4 pt-2">Your submissions</div>
      </div>

      <div class="divider" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.submissions as submission}
          <SubmissionCard {submission} {form}/>
        {/each}
      </div>
    {/if}
  </div>
</div>
