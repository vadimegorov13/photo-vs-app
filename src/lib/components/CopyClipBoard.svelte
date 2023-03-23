<script lang="ts">
  import { onMount } from "svelte";

  export let inviteLink: string;

  let textarea: any;

  onMount(() => {
    textarea.select();
    document.execCommand("copy");
  });
</script>

<textarea bind:value={inviteLink} bind:this={textarea} />
