<script lang="ts">
  import { getImageUrl } from "$lib/helpers/helpers";
  import { Icon, Photo } from "svelte-hero-icons";

  export let user: any;
  console.log(user);
</script>

<div class="navbar bg-red-100">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-2xl px-2">
      <Icon class="h-12 w-12 text-primary" src={Photo} />PhotoVS
    </a>
  </div>

  <div class="flex-none">
    {#if !user}
      <div class="hidden md:block">
        <a href="/login" class="btn btn-outline">Login</a>
        <a href="/register" class="btn btn-primary">Register</a>
      </div>
    {:else}
      <div class="hidden md:block">
        <div class="dropdown dropdown-end">
          <button class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                src={user.avatar
                  ? getImageUrl(user.collectionId, user.id, user.avatar)
                  : `https://avatars.dicebear.com/api/jdenticon/${user.id}.svg`}
                alt="user avatar"
                id="avatar-preview"
              />
            </div>
          </button>
          <ul
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a class="justify-between" href="/tournament/list">My Tournaments</a>
            </li>
            <li><a href="/my/settings">Settings</a></li>
            <form action="/logout" method="POST">
              <li><button type="submit">Logout</button></li>
            </form>
          </ul>
        </div>
      </div>
    {/if}
    <div class="dropdown dropdown-end">
      <button class="btn btn-ghost md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          /></svg
        >
      </button>
      <ul class="menu dropdown-content mt-4 p-2 shadow bg-base-100 rounded-box w-52">
        {#if !user}
          <div>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </div>
        {:else}
          <div>
            <form action="/logout" method="POST">
              <li><button type="submit">Logout</button></li>
            </form>
          </div>
        {/if}
      </ul>
    </div>
  </div>
</div>
