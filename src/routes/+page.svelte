<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>PhotoVS</title>
</svelte:head>

<div class="px-10 py-20">
  <div class="container mx-auto">
    <div class="hero-grid">
      {#if data.user}
        <h1>Welcome {data.user.username}</h1>
      {/if}
      <h1 class="text-4xl text-primary ">
        Create and compete in photo tournaments with your friends!
      </h1>

      <div class="text-xl text-primary">
        With customizable rules and multiple tournament modes, our platform offers an engaging and
        user-friendly experience for photography enthusiasts. Join now and showcase your skills to
        your friends!
      </div>
    </div>

    <div class="hero-grid mt-20">
      <div class="hero-button-container">
        <button class="hero-button bg-primary "> Create Tournament </button>
      </div>

      <div class="hero-button-container">
        <button class="hero-button bg-blue-600"> Join Tournament </button>
      </div>
    </div>
  </div>
</div>
