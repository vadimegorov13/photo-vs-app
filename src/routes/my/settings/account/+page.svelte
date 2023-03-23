<script lang="ts">
  import ValidatedInput from "$lib/components/inputs/ValidatedInput.svelte";
  import Modal from "$lib/components/Modal.svelte";

  export let data;
  export let form;

  let emailModalOpen: boolean;
  let usernameModalOpen: boolean;

  $: emailModalOpen = false;
  $: usernameModalOpen = false;
</script>

<div class="flex flex-col w-full h-full space-y-12">
  <div class="w-full flex flex-col items-center">
    <h3 class="text-2xl font-medium">Change Email</h3>
    <div class="divider" />

    <Modal label="change-email" checked={emailModalOpen}>
      <span slot="trigger" class="btn btn-primary">Change Email</span>
      <h3 slot="heading">Change Your Email</h3>
      <form action="?/updateEmail" method="POST" class="space-y-2">
        <ValidatedInput
          id="email"
          type="email"
          label="Enter your new email address"
          required={true}
          value={data.user.email}
          errors={form?.errors?.username}
        />
        <button type="submit" class="btn btn-primary w-full">Change my email</button>
      </form>
    </Modal>

    {#if form?.errors?.email}
      <div class="alert alert-error shadow-lg mt-6 max-w-md">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{form?.errors?.email[0]}</span>
        </div>
      </div>
    {/if}
    {#if form?.success === true}
    <div class="alert alert-success shadow-lg mt-6 max-w-md">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Please verify your new email</span>
      </div>
    </div>
    {/if}
  </div>
</div>
