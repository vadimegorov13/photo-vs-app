<script lang="ts">
  import { onMount } from "svelte";
  import { Icon, CheckCircle, XCircle } from "svelte-hero-icons";

  export let alertType: string = "error";
  export let customClass = "";

  let isHighOpacity = true;
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
  <div class="fixed bottom-4 right-4 ml-4">
    <div
      class="transition-opacity duration-1000"
      class:opacity-100={isHighOpacity}
      class:opacity-0={!isHighOpacity}
    >
      <div
        class="alert rounded-sm {customClass} {alertType === 'error'
          ? 'alert-error'
          : 'alert-success'}"
      >
        <div class="flex flex-row">
          <div class="w-8">
            <Icon class="w-8" src={alertType === "success" ? CheckCircle : XCircle} />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}
