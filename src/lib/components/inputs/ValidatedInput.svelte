<script lang="ts">
  export let id: string;
  export let value: string | number | undefined = "";
  export let placeholder = "";
  export let label: string;
  export let type = "text";
  export let disabled = false;
  export let required = false;
  export let hidden = false;
  export let errors: string[] | null = null;
  export let customClass: string = "";
  export let autocomplete: string = "";
</script>

<div class="form-control w-full max-w-md {hidden ? 'hidden' : 'form-control'}">
  <label for={id} class="label font-medium">
    <span class="label-text">{label}</span>
  </label>
  <input
    class="input rounded-sm {errors ? 'input-error' : 'input-bordered'} {customClass}"
    {id}
    name={id}
    {value}
    {placeholder}
    {type}
    {disabled}
    {required}
    {hidden}
    autocomplete={autocomplete ? autocomplete : null}
  />
  {#if errors}
    <label for={id} class="label">
      <span class="label-text-alt text-error">{errors[0]}</span>
    </label>
  {/if}
</div>
