<script>
  import { ValidatedInput } from "$lib/components";

  export let form;
</script>

<svelte:head>
  <title>Create Tournament</title>
</svelte:head>

<div class="flex flex-col items-center mx-10">
  <div class="m-10">
    <h2 class="text-primary text-center text-3xl font-bold">Create tournament</h2>
  </div>

  <div class="w-full">
    <form method="POST" class="flex flex-col items-center">
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

      <ValidatedInput
        id="maxPlayers"
        type="number"
        value={form?.data?.maxPlayers ?? 0}
        label="# of Participants"
        errors={form?.errors?.maxPlayers}
      />

      <ValidatedInput
        id="maxSubmissions"
        type="number"
        value={form?.data?.maxSubmissions ?? 0}
        label="# of Submissions"
        errors={form?.errors?.maxSubmissions}
      />

      <div class="w-full max-w-md mt-4">
        <button class="btn btn-primary w-full rounded-sm">Create Tournament</button>
      </div>
    </form>
  </div>
</div>
