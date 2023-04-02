<script lang="ts">
  import { onMount } from "svelte";

  export let alertType: string = "error";
  export let customClass = "";

  let isHighOpacity= true;
  let isVisible = true;

  onMount(() => {
    setTimeout(() => {
      isHighOpacity = false;
    }, 3000);
    setTimeout(() => {
      isVisible = false;
    }, 4000);
  });
</script>

{#if isVisible}
  <div
    class="transition-opacity duration-1000 w-full"
    class:opacity-100={isHighOpacity}
    class:opacity-0={!isHighOpacity}
  >
    <div class="alert alert-{alertType} w-full rounded-sm {customClass} ">
      <slot />
    </div>
  </div>
{/if}
