<script lang="ts">
  import { getImageUrl } from "$lib/helpers";
  import type { User, UserTournament } from "$lib/types";

  export let userTournament: UserTournament;
  export let state: string;
  export let host: boolean;

  let user: User = userTournament.expand.user;
</script>

<div class="mx-2 p-2">
  <div class="flex flex-row space-x-2">
    <div class="avatar">
      <div class="w-16 h-16 rounded-full">
        <img
          src={user?.avatar
            ? getImageUrl(user.collectionId, user.id, user.avatar)
            : `https://avatars.dicebear.com/api/jdenticon/${user.id}.svg`}
          alt="user avatar"
          id="avatar-{user.id}"
        />
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <h1 class="text-md break-word max-w-[16rem] sm:max-w-[16rem] md:max-w-[9rem]">
        {user.username}
      </h1>
      <p class="text-xs text-gray-500">
        Submitted {userTournament.submissions.length}
        {userTournament.submissions.length === 1 ? "photo" : "photos"}
      </p>
      {#if state === "NOT_STARTED"}
        {#if host}
          <span class="badge badge-success text-sm">Host</span>
        {:else if userTournament.ready}
          <span class="badge badge-success text-sm">Ready</span>
        {:else}
          <span class="badge badge-error">Not Ready</span>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .break-word {
    word-wrap: break-word;
    white-space: normal;
  }
</style>
