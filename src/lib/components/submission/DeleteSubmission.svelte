<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { Modal, ValidatedInput } from "$lib/components";
  import type { UserTournament } from "$lib/types";
  import { Icon, Trash } from "svelte-hero-icons";

  export let submissionId: string;
  export let userTournament: UserTournament;
  let deleteModalOpen: boolean;

  $: deleteModalOpen = false;

  let loading = false;

  const enhanceForm = () => {
    loading = true;
    return async ({ result }: any) => {
      if (result.type === "success") {
        await invalidateAll();
      }
      loading = false;
      if (result.type !== "success") {
        await applyAction(result);
      }
    };
  };
</script>

<Modal label="delete-submission-{submissionId}" checked={deleteModalOpen}>
  <span slot="trigger" class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
    <div class="flex flex-col">
      <Icon src={Trash} class="w-8 h-8 mx-auto" />
      delete
    </div>
  </span>
  <h3 slot="heading">Delete this submission?</h3>
  <div class="flex flex-row justify-center space-x-2 mt-4">
    <label for="delete-submission-{submissionId}" class="btn btn-ghost rounded-sm"> No </label>
    <form method="POST" action="?/deleteSubmission" use:enhance={enhanceForm}>
      <ValidatedInput
        id="id"
        type="text"
        label="id"
        value={submissionId}
        hidden
        disabled={loading}
      />
      <ValidatedInput
        id="userTournamentId"
        type="text"
        label="userTournamentId"
        value={userTournament.id}
        hidden
        disabled={loading}
      />
      <ValidatedInput
        id="numberOfSubmissions"
        type="number"
        label="numberOfSubmissions"
        value={userTournament.submissions.length}
        hidden
        disabled={loading}
      />
      <ValidatedInput
        id="tournamentId"
        type="text"
        label="tournamentId"
        value={userTournament.tournament}
        hidden
        disabled={loading}
      />

      <label for="delete-submission-{submissionId}">
        <button type="submit" class="btn btn-error rounded-sm" disabled={loading}>Yes</button>
      </label>
    </form>
  </div>
</Modal>
