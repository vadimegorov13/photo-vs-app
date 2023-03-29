<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { Modal } from "$lib/components";
  import { ValidatedInput } from "$lib/components/inputs";
  import { getImageUrl } from "$lib/helpers";
  import { Icon, Pencil, Trash } from "svelte-hero-icons";

  export let submission: any;
  export let form: any;

  let tournamentAlert: boolean = false;
  let editModalOpen: boolean;
  let loading: boolean;

  $: editModalOpen = false;
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
      handleAlert();
    };
  };

  const handleAlert = () => {
    tournamentAlert = !tournamentAlert;
  };
</script>

<div class="card-normal shadow-lg">
  <div class="card-body">
    {#if tournamentAlert}
      <div class="alert alert-error">
        <div>
          <Icon class="w-16 h-16" src={Trash} />
          <span>Are you sure you want to delete this submission?</span>
        </div>
        <div class="flex flex-col">
          <button on:click={handleAlert} disabled={loading} class="btn btn-sm btn-ghost">
            Cancel
          </button>
          <form method="POST" action="?/delete" use:enhance={deleteSubmission}>
            <ValidatedInput
              id="id"
              type="text"
              label="id"
              value={submission.id}
              disabled={loading}
              hidden
            />
            <button type="submit" disabled={loading} class="btn btn-sm btn-primary">Delete</button>
          </form>
        </div>
      </div>
    {/if}
    {#if form?.errors}
      <div class="alert alert-error shadow-lg mt-6 max-w-md">
        <div class="flex flex-col gap-2">
          {#if form?.errors?.title}
            <p>{form?.errors?.title[0]}</p>
          {/if}
          {#if form?.errors?.description}
            <p>{form?.errors?.description[0]}</p>
          {/if}
        </div>
      </div>
    {/if}
    {#if form?.success === true}
      <div class="alert alert-success shadow-lg mt-6 max-w-md">
        <span>Success</span>
      </div>
    {/if}
    <div class="flex flex-row w-full">
      <h2 class="card-title">{submission.title}</h2>
      <div class="flex flex-row ml-auto">
        <Modal label="change-email" checked={editModalOpen}>
          <span slot="trigger" class="btn btn-ghost text-secondary hover:cursor-pointer">
            <Icon class="w-6 h-6" src={Pencil} />
          </span>
          <h3 slot="heading">Edit your submission</h3>
          <form action="?/edit" method="POST" enctype="multipart/form-data">
            <ValidatedInput
              id="id"
              type="text"
              label="id"
              value={submission.id}
              disabled={loading}
              hidden
            />
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

            <button type="submit" class="btn btn-primary w-full">Update my submission</button>
          </form>
        </Modal>

        <div class="text-error hover:cursor-pointer">
          <button on:click={handleAlert} disabled={loading} class="btn btn-ghost">
            <Icon class="w-6 h-6" src={Trash} />
          </button>
        </div>
      </div>
    </div>
    <img
      src={getImageUrl(submission.collectionId, submission.id, submission.image)}
      alt="submission"
      id={`submission-${submission.id}`}
    />
    <p>{submission.description}</p>
  </div>
</div>
