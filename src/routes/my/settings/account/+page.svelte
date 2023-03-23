<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import Input from "$lib/components/inputs/Input.svelte";
  import Modal from "$lib/components/Modal.svelte";

  export let data;
  let emailModalOpen: boolean;
  let usernameModalOpen: boolean;
  let loading: boolean;
  $: emailModalOpen = false;
  $: usernameModalOpen = false;
  $: loading = false;
  const submitUpdateEmail = () => {
    loading = true;
    emailModalOpen = true;
    return async ({ result }: any) => {
      switch (result.type) {
        case "success":
          await invalidateAll();
          emailModalOpen = false;
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

<div class="flex flex-col w-full h-full space-y-12">
  <div class="w-full">
    <h3 class="text-2xl font-medium">Change Email</h3>
    <div class="divider" />
    <Modal label="change-email" checked={emailModalOpen}>
      <span slot="trigger" class="btn btn-primary">Change Email</span>
      <h3 slot="heading">Change Your Email</h3>
      <form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
        <Input
          id="email"
          type="email"
          label="Enter your new email address"
          required={true}
          value={data.user.email}
          disabled={loading}
        />
        <button type="submit" class="btn btn-primary w-full" disabled={loading}
          >Change my email</button
        >
      </form>
    </Modal>
  </div>
</div>
