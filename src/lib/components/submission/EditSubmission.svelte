<script lang="ts">
  import { Modal, ValidatedInput } from "$lib/components";
  import type { Submission } from "$lib/types";
  import { Icon, Pencil } from "svelte-hero-icons";

  export let submission: Submission;
  export let form: any;
  let editModalOpen: boolean;
  $: editModalOpen = false;
</script>

<Modal label="edit-submission" checked={editModalOpen}>
  <span slot="trigger" class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
    <div class="flex flex-col">
      <Icon src={Pencil} class="w-8 h-8 mx-auto" />
      edit
    </div>
  </span>
  <h3 slot="heading">Edit your submission</h3>
  <form action="/tournament/submission/[id]?/edit" method="POST" enctype="multipart/form-data">
    <ValidatedInput id="id" type="text" label="id" value={submission.id} hidden />
    <ValidatedInput
      id="title"
      label="Title"
      required={true}
      value={submission.title}
      errors={form?.errors?.title}
    />
    <ValidatedInput
      id="description"
      label="Description"
      required={true}
      value={submission.description}
      errors={form?.errors?.description}
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
        class="file-input w-full {form?.errors?.image
          ? 'file-input-error'
          : 'file-input-bordered '}"
      />
      <label for="image" class="label">
        {#if form?.errors?.image}
          <span class="label-text-alt text-error">{form?.errors?.image[0]}</span>
        {/if}
      </label>
    </div>

    <button type="submit" class="btn btn-primary w-full max-w-md">Update my submission</button>
  </form>
</Modal>
