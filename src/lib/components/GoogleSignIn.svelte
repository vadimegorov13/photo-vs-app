<script lang="ts">
  import { app, logout, loginWithGoogle } from '$lib/firebase/config';
  import { getAuth, type User, onAuthStateChanged } from 'firebase/auth';
  import { onMount } from 'svelte';
  let user: User | null;

  onMount(async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (newUser) => {
      console.log(user);
      user = newUser;
    });
  });
</script>

{#if user}
  <p>Signed in with {user.providerData[0].providerId}!</p>
  <button on:click={logout}>Logout</button>
{:else}
  <button on:click={loginWithGoogle}>Login with Google</button>
{/if}
