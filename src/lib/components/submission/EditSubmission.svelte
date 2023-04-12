<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { Modal, ValidatedInput } from "$lib/components";
  import type { Submission } from "$lib/types";
  import { Icon, Pencil } from "svelte-hero-icons";

  export let submission: Submission;

  let editModalOpen: boolean;
  $: editModalOpen = false;

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

<Modal label="edit-submission-{submission.id}" checked={editModalOpen}>
  <span slot="trigger" class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
    <div class="flex flex-col">
      <Icon src={Pencil} class="w-8 h-8 mx-auto" />
      edit
    </div>
  </span>
  <h3 slot="heading">Edit your submission</h3>
  <form
    action="?/editSubmission"
    method="POST"
    enctype="multipart/form-data"
    use:enhance={enhanceForm}
  >
    <ValidatedInput
      id="id"
      type="text"
      label="id"
      value={submission.id}
      hidden
      disabled={loading}
    />
    <ValidatedInput
      id="title"
      label="Title"
      required={true}
      value={submission.title}
      disabled={loading}
    />
    <ValidatedInput
      id="description"
      label="Description"
      required={true}
      value={submission.description}
      disabled={loading}
    />

    <button
      type="submit"
      class="btn btn-primary w-full max-w-md rounded-sm mt-4 p-0"
      disabled={loading}
    >
      <label for="edit-submission-{submission.id}" class="h-full w-full border pt-3.5">
        Update my submission
      </label>
    </button>
  </form>
</Modal>
