<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { Icon, Trash, UserMinus, Share } from "svelte-hero-icons";
  import Input from "../inputs/Input.svelte";
  import CopyClipBoard from "../CopyClipBoard.svelte";

  export let tournament: any;
  export let user: any;
  let loading: boolean;
  let tournamentAlert: boolean = false;
  let readyAlert: boolean = false;

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
      handleDeleteAlert();
    };
  };

  const handleDeleteAlert = () => {
    tournamentAlert = !tournamentAlert;
  };

  const copy = () => {
    const app = new CopyClipBoard({
      target: document.getElementById("clipboard") as any,
      props: {
        inviteLink: `http://127.0.0.1:5173/tournament/join/${tournament.expand.tournament.id}`,
      },
    });
    app.$destroy();
    handleSuccessfullyCopied();
  };

  const handleSuccessfullyCopied = () => {
    alert(`Copide an invite link to your clipboard`);
  };
</script>

<div class="card-normal shadow-lg">
  <div class="card-body">
    {#if tournamentAlert && user.id === tournament.expand.tournament.host}
      <div class="alert alert-error">
        <div>
          <Icon class="w-16 h-16" src={Trash} />
          <span>Are you sure you want to delete this tournament?</span>
        </div>
        <div class="flex flex-col">
          <button on:click={handleDeleteAlert} disabled={loading} class="btn btn-sm btn-ghost"
            >Cancel</button
          >
          <form method="POST" action="?/delete" use:enhance={deleteTournament}>
            <Input
              id="id"
              label="id"
              value={tournament.expand.tournament.id}
              disabled={loading}
              hidden
            />
            <button type="submit" disabled={loading} class="btn btn-sm btn-primary">Delete</button>
          </form>
        </div>
      </div>
    {:else if tournamentAlert && user.id !== tournament.expand.tournament.host}
      <div class="alert alert-error">
        <div>
          <Icon class="w-16 h-16" src={UserMinus} />
          <span>Are you sure you want to leave this tournament?</span>
        </div>
        <div class="flex flex-col">
          <button on:click={handleDeleteAlert} disabled={loading} class="btn btn-sm btn-ghost"
            >Cancel</button
          >
          <form method="POST" action="?/leave" use:enhance={deleteTournament}>
            <Input id="id" label="id" value={tournament.id} disabled={loading} hidden />
            <button type="submit" disabled={loading} class="btn btn-sm btn-primary">Leave</button>
          </form>
        </div>
      </div>
    {/if}
    <div class="flex flex-row w-full">
      <h2 class="card-title">{tournament.expand.tournament.title}</h2>
      <div class="ml-auto text-error hover:cursor-pointer">
        <button on:click={handleDeleteAlert} disabled={loading}>
          <Icon
            class="w-6 h-6"
            src={user.id === tournament.expand.tournament.host ? Trash : UserMinus}
          />
        </button>
      </div>
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
    <div class="flex flex-row items-center">
      <p>
        Join code:
        <slug>{tournament.expand.tournament.joinCode}</slug>
      </p>
      <div class="card-actions justify-end">
        <button on:click={copy} class="btn btn-ghost btn-square"
          ><Icon src={Share} class="w-6 h-6" /></button
        >
      </div>
      <div id="clipboard" />
    </div>
    <p>
      You've submitted
      <slug>{tournament.submissions.length}</slug>
      {tournament.submissions.length === 1 ? "image" : "images"}
    </p>

    <div class="flex flex-row gap-8">
      {#if tournament.submissions.length}
        <div class="card-actions">
          <a href={`/tournament/submission/list/${tournament.id}`}>
            <button class="btn btn-secondary">Your submissions</button>
          </a>
        </div>
      {/if}

      {#if tournament.submissions.length < tournament.expand.tournament.maxSubmissions}
        <div class="card-actions">
          <a href={`/tournament/submission/${tournament.expand.tournament.id}`}>
            <button class="btn btn-accent">Submit Image</button>
          </a>
        </div>
      {/if}
    </div>
    {#if tournament.expand.tournament.host === user.id}
      <div class="card-actions">
        <form method="POST" action="?/start">
          <Input
            id="id"
            label="id"
            value={tournament.expand.tournament.id}
            disabled={loading}
            hidden
          />
          <button type="submit" disabled={loading} class="btn btn-primary">Start</button>
        </form>
      </div>
    {:else}
      <div class="card-actions">
        <form method="POST" action="?/ready">
          <Input
            id="userTournamentId"
            label="userTournamentId"
            value={tournament.id}
            disabled={loading}
            hidden
          />
          <Input
            id="tournamentId"
            label="tournamentId"
            value={tournament.expand.tournament.id}
            disabled={loading}
            hidden
          />
          <button type="submit" disabled={loading} class="btn btn-primary">Ready?</button>
        </form>
      </div>
    {/if}
  </div>
</div>
