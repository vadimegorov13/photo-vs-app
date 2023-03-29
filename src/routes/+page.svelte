<svelte:head>
  <title>PhotoVS</title>
</svelte:head>

<div class="hero bg-base-200 mt-10 py-5 sm:py-20">
  <div class="hero-content">
    <div class="max-w-xl">
      <h1 class="text-5xl font-bold text-primary">
        Create and compete in photo tournaments with your friends!
      </h1>
      <p class="py-6">
        With customizable rules and multiple tournament modes, our platform offers an engaging and
        user-friendly experience for photography enthusiasts. Join now and showcase your skills to
        your friends!
      </p>
      <div class="grid sm:grid-cols-2 gap-8">
        <a href="/tournament/create" class="flex flex-col w-full">
          <button class="btn btn-primary"> Create Tournament </button>
        </a>
        <a href="/tournament/join" class="flex flex-col w-full">
          <button class="btn btn-secondary"> Join Tournament </button>
        </a>
      </div>
    </div>
  </div>
</div>
