<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import "../app.css";
  export let data
</script>

<div class="flex flex-col min-h-screen">
  <Nav user={data.user}/>

  <div class="flex-1 w-full bg-lightOrange">
    <slot />
  </div>

  <Footer />
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.50);
  }
</style>
