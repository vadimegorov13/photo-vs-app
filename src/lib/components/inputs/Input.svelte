<script lang="ts">
  export let value = "";
  export let placeholder = "";
  export let id: string;
  export let label: string;
  export let type = "text";
  export let disabled = false;
  export let required = false;
  export let hidden = false;
</script>

<div class="form-control w-full max-w-lg mb-2 {hidden ? 'hidden' : 'block'}">
  <label for={id} class="label font-medium pb-1">
    <span class="label-text">{label}</span>
  </label>
  <input
    class="input input-bordered w-full max-w-lg"
    {type}
    name={id}
    {id}
    {value}
    {placeholder}
    {disabled}
    {required}
    {hidden}
  />
</div>
