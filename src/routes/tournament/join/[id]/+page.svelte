<script>
  import Preview from "$lib/components/tournament/Preview.svelte";
  export let data;
  export let form;

  let full = false;

  if (data.tournament) {
    full =
      data.tournament?.registeredUsers?.length / data?.tournament?.expand?.settings?.maxPlayers ===
      1;
  }
</script>

<div>
  {#if !data.tournament}
    <div class="flex flex-col items-center m-12 text-3xl text-black">Tournament doesn't exist</div>
  {:else}
    <Preview data={data.tournament} />
    <div class="mt-12">
      <form method="POST" action="?/join" class="flex flex-col items-center space-y-2 w-full">
        <input type="text" name="id" class="input" value={data.tournament.id} hidden />

        <button
          class="btn {data.tournament.expand.state.tournamentState !== 'pending' || full
            ? 'btn-disabled'
            : 'btn-primary'} w-full max-w-sm"
        >
          Join
        </button>
        <div>
          {#if form?.error}
            <div class="alert alert-error shadow-md p-6 max-w-sm">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  /></svg
                >
                <span>{form.error.body.message}</span>
              </div>
            </div>
          {/if}
        </div>
      </form>
    </div>
  {/if}
</div>

<!-- data.tournament.status === 'pending' &&  -->
