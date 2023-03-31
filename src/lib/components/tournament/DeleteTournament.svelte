<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { Modal, ValidatedInput } from "$lib/components";
  import { Icon, Trash, ArrowRightOnRectangle } from "svelte-hero-icons";

  export let id: string;
  export let label: string = "delete-tournament";
  export let title: string = "Delete this tournament?";
  export let action: string = "/tournament/[id]?/delete";
  export let enhanceForm: boolean = true;

  let modalOpen: boolean;
  let loading: boolean;

  $: modalOpen = false;
  $: loading = false;

  const deleteEnhance = async () => {
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
    };
  };
</script>

<Modal {label} checked={modalOpen}>
  <span slot="trigger" class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
    <div class="flex flex-col">
      <Icon
        src={label.includes("delete") ? Trash : ArrowRightOnRectangle}
        class="w-8 h-8 mx-auto"
      />
      {label.includes("delete") ? "delete" : "leave"}
    </div>
  </span>
  <h3 slot="heading">{title}</h3>
  <div class="flex flex-row justify-center space-x-2 mt-4">
    <label for={label} class="btn btn-ghost"> No </label>
    <form method="POST" {action} use:enhance={enhanceForm ? deleteEnhance : undefined}>
      <ValidatedInput id="id" type="text" label="id" value={id} disabled={loading} hidden />
      <button type="submit" disabled={loading} class="btn btn-error">Yes</button>
    </form>
  </div>
</Modal>
