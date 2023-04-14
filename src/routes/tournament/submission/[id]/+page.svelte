<script lang="ts">
  import { ValidatedInput } from "$lib/components";

  export let data;
  export let form;
</script>

<div class="flex flex-col items-center">
  <div class="m-10">
    <h2 class="text-primary text-center text-3xl font-bold">Submit your photo</h2>
  </div>

  <div class="w-full">
    <form
      method="POST"
      action="?/create"
      class="flex flex-col items-center"
      enctype="multipart/form-data"
    >
      <ValidatedInput
        id="title"
        value={form?.data?.title ?? ""}
        label="Title"
        errors={form?.errors?.title}
      />

      <ValidatedInput
        id="description"
        value={form?.data?.description ?? ""}
        label="Description"
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
          class="file-input w-full rounded-sm {form?.errors?.image
            ? 'file-input-error'
            : 'file-input-bordered '}"
        />
        <label for="image" class="label">
          {#if form?.errors?.image}
            <span class="label-text-alt text-error">{form?.errors?.image[0]}</span>
          {/if}
        </label>
      </div>

      <input type="text" name="tournamentId" value={data.id} hidden />

      <div class="w-full max-w-md">
        <button class="btn btn-primary w-full rounded-sm">Submit</button>
      </div>
    </form>
  </div>
</div>
