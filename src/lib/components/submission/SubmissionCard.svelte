<script lang="ts">
  import { Alert, EditSubmission } from "$lib/components";
  import { getImageUrl } from "$lib/helpers";
  import type { Submission } from "$lib/types";
  import DeleteSubmission from "./DeleteSubmission.svelte";

  export let submission: Submission;
  export let form: any;
</script>

<div class="card-normal shadow-lg">
  <div class="card-body">
    {#if form?.errors}
      <Alert customClass="max-w-md">
        {#if form?.errors?.title}
          {form?.errors?.title[0]}
        {/if}
        {#if form?.errors?.description}
          {form?.errors?.description[0]}
        {/if}
      </Alert>
    {/if}
    {#if form?.success === true}
      <Alert customClass="max-w-md" alertType="success">
        <span>Success</span>
      </Alert>
    {/if}
    <div class="flex flex-row w-full">
      <h2 class="card-title">{submission.title}</h2>
      <div class="flex flex-row ml-auto">
        <EditSubmission {submission} {form} />
        <DeleteSubmission submissionId={submission.id} />
      </div>
    </div>
    <img
      src={getImageUrl(submission.collectionId, submission.id, submission.image)}
      alt="submission"
      id={`submission-${submission.id}`}
    />
    <p>{submission.description}</p>
  </div>
</div>
