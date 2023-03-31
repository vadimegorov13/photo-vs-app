<script lang="ts">
  import { Modal, ValidatedInput } from "$lib/components";
  import type { Submission } from "$lib/types";
  import { Icon, Pencil } from "svelte-hero-icons";

  export let submission: Submission;

  let editModalOpen: boolean;
  $: editModalOpen = false;
</script>

<Modal label="edit-submission-{submission.id}" checked={editModalOpen}>
  <span slot="trigger" class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
    <div class="flex flex-col">
      <Icon src={Pencil} class="w-8 h-8 mx-auto" />
      edit
    </div>
  </span>
  <h3 slot="heading">Edit your submission</h3>
  <form action="?/editSubmission" method="POST" enctype="multipart/form-data">
    <ValidatedInput id="id" type="text" label="id" value={submission.id} hidden />
    <ValidatedInput id="title" label="Title" required={true} value={submission.title} />
    <ValidatedInput
      id="description"
      label="Description"
      required={true}
      value={submission.description}
    />
    <div class="form-control w-full max-w-md">
      <label for="image" class="label font-medium">
        <span class="label-text">Photo</span>
      </label>
      <input
        type="file"
        name="image"
        value=""
        accept="image/*"
        id="image"
        class="file-input w-full file-input-bordered"
      />
    </div>

    <button type="submit" class="btn btn-primary w-full max-w-md mt-6">Update my submission</button>
  </form>
</Modal>
