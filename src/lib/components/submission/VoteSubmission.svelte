<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { ValidatedInput } from "$lib/components";
  import type { Submission } from "$lib/types";

  export let submission: Submission;
  export let imageUrl: string;
  export let matchId: string;
  export let voted: string | null;

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

<div
  class="border rounded-sm duration-300 {voted === submission.id
    ? 'rounded-sm border-2 border-green-500 shadow-lg shadow-green-200 scale-105'
    : ''} 
  {voted && voted !== submission.id ? 'scale-95' : ''}"
>
  <h1 class="text-center text-xl">{submission.title}</h1>
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
    <button class={voted ? "btn-disabled" : ""} disabled={loading}>
      <img
        src={imageUrl}
        alt="submission2"
        id="submission-{submission.id}"
        class="hover:cursor-pointer w-[40rem] {voted && voted !== submission.id
          ? 'duration-100 prose prose-xl'
          : ''}"
      />
    </button>
  </form>
  <h1 class="text-center text-md text-gray-500">{submission.description}</h1>
</div>
