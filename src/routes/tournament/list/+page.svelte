<script lang="ts">
  export let data;
</script>

<div>
  {#each data.tournaments as tournament}
    <div>
        Title: {tournament.title}
    </div>
  {/each}
</div>
