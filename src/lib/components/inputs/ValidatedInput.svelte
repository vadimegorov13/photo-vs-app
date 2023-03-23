<script lang="ts">
  export let id: string;
  export let value = "";
  export let placeholder = "";
  export let label: string;
  export let type = "text";
  export let disabled = false;
  export let required = false;
  export let hidden = false;
  export let errors: string[] | null = null;
  export let customClass: string = "";
</script>

<div class="form-control w-full max-w-md {hidden ? 'hidden' : 'form-control'}">
  <label for={id} class="label font-medium">
    <span class="label-text">{label}</span>
  </label>
  <input
    class="input {errors ? 'input-error' : 'input-bordered'} {customClass}"
    {id}
    name={id}
    {value}
    {placeholder}
    {type}
    {disabled}
    {required}
    {hidden}
  />
  <label for={id} class="label">
    {#if errors}
      <span class="label-text-alt text-error">{errors[0]}</span>
    {/if}
  </label>
</div>
