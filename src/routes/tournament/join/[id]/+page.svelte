<script>
  import Loading from "$lib/components/Loading.svelte";
  import Preview from "$lib/components/tournament/Preview.svelte";
  export let data;
</script>

<div>
  {#if !data.tournament}
    <div class="flex flex-col items-center m-12 text-3xl">Tournament doesn't exist</div>
  {:else}
    <Preview data={data.tournament} />
    <div class="mt-12">
      <form method="POST" action="?/join" class="flex flex-col items-center space-y-2 w-full">
        <input type="text" name="id" class="input" value={data.tournament.id} hidden />

        <button
          class="btn {data.tournament.status === 'pending'
            ? 'bg-primary'
            : 'btn-disabled'} w-full max-w-xs text-white hover:bg-purple-700 delay-100"
        >
          Join
        </button>
      </form>
    </div>
  {/if}
</div>
