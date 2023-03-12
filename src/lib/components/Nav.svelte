<script lang="ts">
  import { logout, loginWithGoogle } from '$lib/firebase/firebase';
  import type {User} from 'firebase/auth';
  export let user: User | null;
</script>

<nav class="flex items-center justify-between flex-wrap py-4 px-10 bg-gray-50">
  <a href="/" class="flex-shrink-0 flex items-center">
    <img src="./favicon.png" alt="favicon" width="32" height="32" class="mr-2" />
    <span class="font-bold text-2xl tracking-tight text-purple-500"> PhotoVS </span>
  </a>

  {#if user}
    <p>Signed in with {user.providerData[0].providerId}!</p>
    <button on:click={logout}>Logout</button>
  {:else}
    <button on:click={loginWithGoogle}>Login with Google</button>
  {/if}
</nav>
