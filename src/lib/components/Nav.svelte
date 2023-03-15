<script lang="ts">
  import IoMdPhotos from "svelte-icons/io/IoMdPhotos.svelte";

  type User = {
    id: string;
    username: string;
    email: string;
    avatar: string;
  };

  export let user: User;
</script>

<div class="navbar container mx-auto bg-base-100 px-4">
  <div class="navbar-start">
    <a href="/" class="h-12 w-12 text-xl text-base-100 hover:cursor-pointer bg-primary rounded-md">
      <IoMdPhotos />
    </a>
    <a
      href="/"
      class="ml-2 text-xl md:text-3xl duration-300 hover:cursor-pointer hover:text-primary"
      >Photo-VS
    </a>
  </div>

  <div class="navbar-end space-x-2">
    {#if !user}
      <div class="hidden md:block">
        <a href="/login" class="btn btn-outline">Login</a>
        <a
          href="/register"
          class="btn btn-outline hover:bg-primary hover:text-white hover:border-primary">Register</a
        >
      </div>
    {:else}
      <div class="hidden md:block">
        <form action="/logout" method="POST">
          <button class="btn btn-outline" type="submit">Logout</button>
        </form>
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
