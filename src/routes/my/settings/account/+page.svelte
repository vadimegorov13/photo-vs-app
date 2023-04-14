<script lang="ts">
  import { Alert, Modal, ValidatedInput } from "$lib/components";
  export let data;
  export let form;

  let emailModalOpen: boolean;
  $: emailModalOpen = false;
</script>

<svelte:head>
  <title>Settings | Account</title>
</svelte:head>

<div class="flex flex-col w-full h-full space-y-4">
  <div class="w-full flex flex-col items-center">
    <h3 class="text-2xl font-medium">Change Email</h3>
    <div class="divider" />

    <Modal label="change-email" checked={emailModalOpen}>
      <span slot="trigger"><div class="btn btn-primary rounded-sm">Change Email</div></span>
      <h3 slot="heading">Change Your Email</h3>
      <form method="POST" class="max-w-md mx-auto">
        <ValidatedInput
          id="email"
          type="email"
          label="Enter your new email address"
          required={true}
          value={data.user?.email}
          errors={form?.errors?.username}
        />
        <button type="submit" class="btn btn-primary w-full rounded-sm mt-4">Change my email</button
        >
      </form>
    </Modal>
  </div>
  <div class="max-w-md mx-auto w-full">
    {#if form?.errors?.email}
      <Alert>{form?.errors?.email[0]}</Alert>
    {/if}
    {#if form?.success === true}
      <Alert alertType="success">Please verify your new email</Alert>
    {/if}
  </div>
</div>
