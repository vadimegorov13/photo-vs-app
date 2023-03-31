<script lang="ts">
  import { Alert, EditSubmission } from "$lib/components";
  import { getImageUrl } from "$lib/helpers";
  import type { Submission } from "$lib/types";
  import DeleteSubmission from "./DeleteSubmission.svelte";

  export let submission: Submission;
  export let form: any;
</script>

<div class="border rounded-sm">
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
  <div class="flex flex-col">
    <div class="relative">
      <div class="absolute -bottom-0.5 -right-0 bg-base-100 rounded-sm">
        <EditSubmission {submission} {form} />
        <DeleteSubmission submissionId={submission.id} />
      </div>
      <img
        src={getImageUrl(submission.collectionId, submission.id, submission.image)}
        alt="submission"
        id="submission-{submission.id}"
        class="w-full static"
      />
    </div>
    <div class="p-4">
      <h1 class="text-xl font-semibold">{submission.title}</h1>
    <p class="text-lg text-gray-500">
      {submission.description}
    </p>
    </div>
  </div>
</div>
