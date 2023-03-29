<script lang="ts">
  export let alertType: string = "error";
  export let customClass = "";
</script>

<div class="alert alert-{alertType} w-full rounded-sm {customClass}">
  <slot />
</div>
