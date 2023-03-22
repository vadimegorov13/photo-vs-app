<script lang="ts">
  import { Icon, Trash } from "svelte-hero-icons";
  import { invalidateAll } from "$app/navigation";
  import { enhance, applyAction } from "$app/forms";
  import MyInput from "../MyInput.svelte";

  export let tournament: any;
  export let user: any;
  let loading: boolean;
  let deleteAlert: boolean = false;

  $: loading = false;

  const deleteTournament = async () => {
    loading = true;
    return async ({ result }: any) => {
      switch (result.type) {
        case "success":
          await invalidateAll();
          break;
        case "error":
          break;
        default:
          await applyAction(result);
      }
      loading = false;
      handleAlert()
    };
  };

  const handleAlert = () => {
    deleteAlert = !deleteAlert;
  };
</script>

{#if deleteAlert}
  <div class="alert shadow-lg alert-error">
    <div>
      <Icon class="w-4 h-4" src={Trash} />
      <span>Are you sure you want to delete this tournament?.</span>
    </div>
    <div class="flex-none">
      <button on:click={handleAlert} disabled={loading} class="btn btn-sm btn-ghost">Cancel</button>
      <form method="POST" action="?/delete" use:enhance={deleteTournament}>
        <MyInput
          id="id"
          label="id"
          value={tournament.expand.tournament.id}
          disabled={loading}
          hidden
        />
        <button
          type="submit"
          disabled={loading}
          class="btn btn-sm btn-primary">Delete</button
        >
      </form>
    </div>
  </div>
{/if}

<div class="card md:card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src="https://cdn.pixabay.com/photo/2022/11/14/18/27/ai-generated-7592244_960_720.jpg"
      alt="Movie"
    />
  </figure>
  <div class="card-body">
    <div class="flex flex-row gap-8">
      <h2 class="card-title">{tournament.expand.tournament.title}</h2>
      {#if user.id === tournament.expand.tournament.host}
        <div class="text-error hover:cursor-pointer">
          <button on:click={handleAlert} disabled={loading}
            ><Icon class="w-6 h-6" src={Trash} /></button
          >
        </div>
      {/if}
    </div>

    <p>{tournament.expand.tournament.description}</p>

    <p>
      Participants:
      <slug
        >{tournament.expand.tournament.registeredUsers.length}/{tournament.expand.tournament
          .maxPlayers}</slug
      >
    </p>
    <p>
      Max submissions:
      <slug>{tournament.expand.tournament.maxSubmissions}</slug>
    </p>
    <div class="flex flex-row">
      <p>
        You've submitted
        <slug>{tournament.submissions.length}</slug> images
      </p>
      <div class="card-actions justify-end">
        <a sapper:prefetch rel="external" href={`/tournament/submission/${tournament.tournament}`}>
          <button class="btn btn-primary">Submit photo</button>
        </a>
      </div>
    </div>
  </div>
</div>
