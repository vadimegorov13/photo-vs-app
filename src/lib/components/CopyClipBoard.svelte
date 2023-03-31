<script lang="ts">
  import { onMount } from "svelte";

  export let link: string;

  let textarea: any;

  onMount(() => {
    textarea.select();
    document.execCommand("copy");
  });
</script>

<textarea bind:value={link} bind:this={textarea} />
