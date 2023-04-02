<script lang="ts">
  import { Modal, ValidatedInput } from "$lib/components";
  import { Icon, Trash, ArrowRightOnRectangle } from "svelte-hero-icons";

  export let id: string;
  export let label: string = "delete-tournament";
  export let title: string = "Delete this tournament?";
  export let action: string = "/tournament/[id]?/delete";

  let modalOpen: boolean;
  $: modalOpen = false;
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
    <label for={label} class="btn btn-ghost rounded-sm"> No </label>
    <form method="POST" {action}>
      <ValidatedInput id="id" type="text" label="id" value={id} hidden />
      <label for={label}>
        <button type="submit" class="btn btn-error rounded-sm"> Yes </button>
      </label>
    </form>
  </div>
</Modal>
