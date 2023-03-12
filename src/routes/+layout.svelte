<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import { app } from '$lib/firebase/firebase';
  import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
  import { onMount } from 'svelte';
  import '../app.css';

  export let user: User | null;

  $: user && console.log(user);

  onMount(async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (newUser) => {
      console.log(user);
      user = newUser;
    });
  });
</script>

<div class="flex flex-col min-h-screen">
  <Nav {user} />

  <div class="flex-1 w-full bg-lightOrange">
    <slot />
  </div>

  <Footer />
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.50);
    color: theme(colors.black);
  }
</style>
