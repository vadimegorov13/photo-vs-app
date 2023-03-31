<script lang="ts">
  import { Modal, ValidatedInput } from "$lib/components";
  import { Icon, Trash } from "svelte-hero-icons";

  export let submissionId: string;
  export let tournamentId: string;
  let deleteModalOpen: boolean;

  $: deleteModalOpen = false;
</script>

<Modal label="delete-submission" checked={deleteModalOpen}>
  <span slot="trigger" class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12 ">
    <div class="flex flex-col">
      <Icon src={Trash} class="w-8 h-8 mx-auto" />
      delete
    </div>
  </span>
  <h3 slot="heading">Delete this submission?</h3>
  <div class="flex flex-row justify-center space-x-2 mt-4">
    <label for="delete-submission" class="btn btn-ghost"> No </label>
    <form method="POST" action="?/deleteSubmission">
      <ValidatedInput id="id" type="text" label="id" value={submissionId} hidden />
      <ValidatedInput
        id="tournamentId"
        type="text"
        label="tournamentId"
        value={tournamentId}
        hidden
      />
      <label for="delete-submission">
        <button type="submit" class="btn btn-error">Yes</button>
      </label>
    </form>
  </div>
</Modal>
