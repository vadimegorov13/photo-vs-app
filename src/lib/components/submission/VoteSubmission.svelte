<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { ValidatedInput } from "$lib/components";
  import type { Submission } from "$lib/types";

  export let submission: Submission;
  export let imageUrls: string;
  export let matchId: string;
  export let voted: boolean;

  let loading: boolean = false;

  const enhanceForm = () => {
    loading = true;
    return async ({ result }: any) => {
      switch (result.type) {
        case "success":
          await invalidateAll();
          break;
        case "error":
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

<div>
  <h1 class="text-center text-xl mb-4">{submission.title}</h1>
  <a href={imageUrls} target="_blank">
    <img
      src={imageUrls}
      alt="submission2"
      id="submission-{submission.id}"
      class="border w-[40rem]"
    />
  </a>
  <form method="POST" class="flex flex-col items-center" action="?/vote" use:enhance={enhanceForm}>
    <ValidatedInput
      id="submissionId"
      value={submission.id}
      label="submission-{submission.id}"
      hidden
      disabled={loading}
    />
    <ValidatedInput
      id="matchId"
      value={matchId}
      label="match-{matchId}"
      hidden
      disabled={loading}
    />
    <div class=" mt-4">
      <button
        class="btn btn-primary w-full rounded-sm {voted ? 'btn-disabled' : ''}"
        disabled={loading}
      >
        Vote
      </button>
    </div>
  </form>
</div>
