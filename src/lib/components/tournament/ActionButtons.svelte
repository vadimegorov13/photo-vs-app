<script lang="ts">
  import { applyAction } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { DeleteTournament } from "$lib/components";
  import { copyToClipBoard } from "$lib/helpers";
  import type { Tournament, UserTournament } from "$lib/types";
  import {
    Check,
    DocumentArrowUp,
    Folder,
    Icon,
    Link,
    UserPlus,
    XMark,
  } from "svelte-hero-icons";

  export let tournament: Tournament;
  export let userId: string;
  export let userTournament: UserTournament | undefined;
  let loading: boolean;

  $: loading = false;

  const isready = tournament.expand.registeredUsers.some((userTournament) => {
    if (userTournament.expand.user.id === userId) {
      return userTournament.ready;
    }
  });

  const buttonEnhance = async () => {
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
    };
  };
</script>

<div class="flex flex-row">
  <button
    on:click={() => copyToClipBoard(tournament.id)}
    class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12"
  >
    <div class="flex flex-col">
      <Icon src={Link} class="w-8 h-8 mx-auto" />
      share
    </div>
    <div id="clipboard" />
  </button>

  <div class="divider divider-horizontal mx-auto" />

  {#if userTournament}
    <div class="mx-auto">
      {#if !isready}
        <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
          <div class="flex flex-col">
            <Icon src={Check} class="w-8 h-8 mx-auto" />
            ready
          </div>
        </button>
      {:else}
        <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
          <div class="flex flex-col">
            <Icon src={XMark} class="w-8 h-8 mx-auto" />
            ready
          </div>
        </button>
      {/if}

      {#if userTournament.submissions.length < tournament.expand.settings.maxSubmissions}
        <a href="/tournament/submission/{tournament.id}">
          <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
            <div class="flex flex-col">
              <Icon src={DocumentArrowUp} class="w-8 h-8 mx-auto" />
              submit
            </div>
          </button>
        </a>
      {/if}
      {#if userTournament.submissions.length > 0}
        <a href="/tournament/submission/list/{userTournament.id}">
          <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
            <div class="flex flex-col">
              <Icon src={Folder} class="w-8 h-8 mx-auto" />
              photos
            </div>
          </button>
        </a>
      {/if}
    </div>

    <div class="divider divider-horizontal mx-auto" />
  {/if}

  {#if userTournament}
    {#if tournament.host === userId}
      <DeleteTournament id={tournament.id} enhanceForm={false}/>
    {:else}
      <DeleteTournament
        id={userTournament.id}
        label="leave-tournament"
        title="Leave this tournament?"
        action="/tournament/[id]?/leave"
        enhanceForm={false}
      />
    {/if}
  {:else}
    <form method="POST" action="/tournament/{tournament.id}?/join">
      <input type="text" name="id" class="input" value={tournament.id} hidden />
      <button class="btn btn-ghost rounded-sm text-xs lowercase px-2 w-12">
        <div class="flex flex-col">
          <Icon src={UserPlus} class="w-8 h-8 mx-auto" />
          join
        </div>
      </button>
    </form>
  {/if}
</div>
