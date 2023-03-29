<script lang="ts">
  import { Alert, Modal, ValidatedInput } from "$lib/components";
  export let data;
  export let form;

  let emailModalOpen: boolean;
  $: emailModalOpen = false;
</script>

<div class="flex flex-col w-full h-full space-y-12">
  <div class="w-full flex flex-col items-center">
    <h3 class="text-2xl font-medium">Change Email</h3>
    <div class="divider" />

    <Modal label="change-email" checked={emailModalOpen}>
      <span slot="trigger" class="btn btn-primary">Change Email</span>
      <h3 slot="heading">Change Your Email</h3>
      <form method="POST" class="space-y-2">
        <ValidatedInput
          id="email"
          type="email"
          label="Enter your new email address"
          required={true}
          value={data.user?.email}
          errors={form?.errors?.username}
        />
        <button type="submit" class="btn btn-primary w-full">Change my email</button>
      </form>
    </Modal>

    {#if form?.errors?.email}
      <Alert>{form?.errors?.email[0]}</Alert>
    {/if}
    {#if form?.success === true}
      <Alert alertType="success">Please verify your new email</Alert>
    {/if}
  </div>
</div>
