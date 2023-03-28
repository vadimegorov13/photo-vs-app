<script lang="ts">
  import { getImageUrl } from "$lib/helpers";
  import { Icon, Photo } from "svelte-hero-icons";

  export let user: any;
</script>

<nav class="navbar bg-red-100">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-2xl px-2">
      <Icon class="h-12 w-12 text-primary" src={Photo} />PhotoVS
    </a>
  </div>

  <div class="flex-none">
    {#if !user}
      <div>
        <a href="/login" class="btn btn-outline">Login</a>
        <a href="/register" class="btn btn-primary">Register</a>
      </div>
    {:else}
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full overflow-hidden">
            <img
              src={user.avatar
                ? getImageUrl(user.collectionId, user.id, user.avatar)
                : `https://avatars.dicebear.com/api/jdenticon/${user.id}.svg`}
              alt="user avatar"
              id="user-avatar"
            />
          </div>
        </button>
        <ul class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between" href="/tournament/list">My Tournaments</a>
          </li>
          <li><a href="/my/settings">Settings</a></li>
          <div class="divider m-0" />
          <form action="/logout" method="POST">
            <li><button type="submit">Logout</button></li>
          </form>
        </ul>
      </div>
    {/if}
  </div>
</nav>
