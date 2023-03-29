<script>
  import { Alert, Preview } from "$lib/components";

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
      <form method="POST" class="flex flex-col items-center space-y-2 w-full">
        <input type="text" name="id" class="input" value={data.tournament.id} hidden />

        <button
          class="btn {data.tournament.expand.state.tournamentState !== 'pending' || full
            ? 'btn-disabled'
            : 'btn-primary'} w-full max-w-sm"
        >
          Join
        </button>
        {#if form?.error}
          <Alert customClass="max-w-sm">{form.error.message}</Alert>
        {/if}
      </form>
    </div>
  {/if}
</div>

<!-- data.tournament.status === 'pending' &&  -->
