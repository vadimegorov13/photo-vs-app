<script>
  import { redirect } from "@sveltejs/kit";
</script>

<svelte:head>
  <title>PhotoVS</title>
</svelte:head>

  <div class="hero bg-base-200 my-10">
    <div class="hero-content">
      <div class="max-w-xl">
        <h1 class="text-5xl font-bold text-primary">Create and compete in photo tournaments with your friends!</h1>
        <p class="py-6">
          With customizable rules and multiple tournament modes, our platform offers an engaging and
          user-friendly experience for photography enthusiasts. Join now and showcase your skills to
          your friends!
        </p>
        <div class="grid sm:grid-cols-2 gap-8">
          <button class="btn btn-primary" on:click={() => redirect(303, "/tournament/create")}
            >Create Tournament</button
          >
          <button class="btn btn-secondary" on:click={() => redirect(303, "/tournament/join")}
            >Join Tournament</button
          >
        </div>
      </div>
    </div>
  </div>
  