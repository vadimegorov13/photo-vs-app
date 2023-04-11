<script lang="ts">
  import { getImageUrl } from "$lib/helpers";
  import { Icon, Photo } from "svelte-hero-icons";

  export let user: any;
</script>

<nav class="navbar bg-red-100">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-2xl px-2 rounded-sm">
      <Icon class="h-12 w-12 text-primary" src={Photo} />PhotoVS
    </a>
  </div>

  <div class="flex-none">
    {#if !user}
      <div>
        <a href="/login" class="btn btn-outline rounded-sm">Login</a>
        <a href="/register" class="btn btn-primary rounded-sm">Register</a>
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
        <ul class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-sm w-52">
          <a class="justify-between mb-2" href="/tournament/list">
            <button class="btn btn-ghost rounded-sm w-full font-medium hover:btn-primary">
              My Tournaments
            </button>
          </a>
          <a href="/my/settings">
            <button class="btn btn-ghost rounded-sm w-full font-medium hover:btn-primary">
              Settings
            </button>
          </a>
          <div class="divider my-1" />
          <form action="/logout" method="POST">
            <button
              type="submit"
              class="btn btn-ghost rounded-sm w-full font-medium hover:btn-primary"
            >
              Logout
            </button>
          </form>
        </ul>
      </div>
    {/if}
  </div>
</nav>
