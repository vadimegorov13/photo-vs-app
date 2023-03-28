<script lang="ts">
  import { Footer, Nav } from "$lib/components";
  import "../app.css";
  export let data;
</script>

<div class="flex flex-col min-h-screen">
  <Nav user={data.user} />

  <div class="flex-1">
    <slot />
  </div>

  <Footer />
</div>
