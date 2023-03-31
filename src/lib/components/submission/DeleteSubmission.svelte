<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { Modal, ValidatedInput } from "$lib/components";
  import { Icon, Trash } from "svelte-hero-icons";

  export let submissionId: string;

  let deleteModalOpen: boolean;
  let loading: boolean;

  $: deleteModalOpen = false;
  $: loading = false;

  const deleteSubmission = async () => {
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
    <form method="POST" action="/tournament/submission/[id]?/delete" use:enhance={deleteSubmission}>
      <ValidatedInput
        id="id"
        type="text"
        label="id"
        value={submissionId}
        disabled={loading}
        hidden
      />
      <button type="submit" disabled={loading} class="btn btn-error">Yes</button>
    </form>
  </div>
</Modal>
