<script lang="ts">
  import { Modal, ValidatedInput } from "$lib/components";
  import type { UserTournament } from "$lib/types";
  import { Icon, Trash } from "svelte-hero-icons";

  export let submissionId: string;
  export let userTournament: UserTournament;
  let deleteModalOpen: boolean;

  $: deleteModalOpen = false;
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
    <form method="POST" action="?/deleteSubmission">
      <ValidatedInput id="id" type="text" label="id" value={submissionId} hidden />
      <ValidatedInput
        id="userTournamentId"
        type="text"
        label="userTournamentId"
        value={userTournament.id}
        hidden
      />
      <ValidatedInput
        id="numberOfSubmissions"
        type="number"
        label="numberOfSubmissions"
        value={userTournament.submissions.length}
        hidden
      />

      <label for="delete-submission-{submissionId}">
        <button type="submit" class="btn btn-error rounded-sm">Yes</button>
      </label>
    </form>
  </div>
</Modal>
