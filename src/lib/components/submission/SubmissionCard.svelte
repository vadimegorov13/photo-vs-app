<script lang="ts">
  import { DeleteSubmission, EditSubmission } from "$lib/components";
  import { getImageUrl } from "$lib/helpers";
  import type { Submission, UserTournament } from "$lib/types";

  export let userTournament: UserTournament;
  export let submission: Submission;
  export let state: string;

  let imageUrl = getImageUrl(submission.collectionId, submission.id, submission.image);
</script>

<div class="border rounded-sm">
  <div class="flex flex-col">
    <div class="relative border-b">
      <div class="border-t border-l absolute -bottom-0 -right-0 bg-base-100 rounded-sm">
        {#if state === "NOT_STARTED"}
          <EditSubmission {submission} />
          <DeleteSubmission submissionId={submission.id} {userTournament} />
        {/if}
        {#if state === "FINISHED"}
          <DeleteSubmission submissionId={submission.id} {userTournament} />
        {/if}
      </div>

      <a href={imageUrl} target="_blank">
        <img
          src={imageUrl}
          alt="submission"
          id="submission-{submission.id}"
          class="w-full static"
        />
      </a>
    </div>
    <div class="p-4">
      <h1 class="text-lg font-semibold">{submission.title}</h1>
      <p class="text-md text-gray-500">
        {submission.description}
      </p>
    </div>
  </div>
</div>
