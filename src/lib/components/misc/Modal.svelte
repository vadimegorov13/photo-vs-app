<script lang="ts">
  export let label: string;
  export let checked: boolean;
</script>

<label for={label}>
  <slot name="trigger" />
</label>

<input type="checkbox" id={label} class="modal-toggle" {checked} />
<label for={label} class="modal">
  <label for={label} class="modal-box rounded-sm">
    <div class="font-bold text-xl text-center">
      <slot name="heading" />
    </div>
    <div>
      <slot />
    </div>
  </label>
</label>
