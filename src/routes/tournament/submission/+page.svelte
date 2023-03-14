<script lang="ts">
  import { onMount } from 'svelte';

let tournamentId: string | null;

onMount(() => {
  const searchParams = new URLSearchParams(window.location.search);
  tournamentId = searchParams.get('id');
});
</script>


<div class="flex flex-col items-center h-full w-full pt-12">
  <h2 class="mt-2 text-center text-3xl font-bold text-primary">Submit your photos</h2>
  
  <div class="bg-base-100 py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
    <form method="POST" action="?/create" class="flex flex-col items-center space-y-2 w-full">
      <div class="form-control w-full max-w-xs">
        <label for="title" class="label font-medium pb-1">
          <span class="label-text">Title</span>
        </label>
        <input type="text" name="title" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs">
        <label for="imageUrl" class="label font-medium pb-1">
          <span class="label-text">imageUrl</span>
        </label>
        <input type="text" name="imageUrl" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs">
        <label for="tournamentId" class="label font-medium pb-1">
          <span class="label-text">tournamentId</span>
        </label>
        <input type="text" name="tournamentId" class="input input-bordered w-full max-w-xs" value={tournamentId}/>
      </div>
     
     
      <div class="w-full max-w-xs">
        <button class="btn bg-primary w-full max-w-xs text-white hover:bg-purple-700 delay-100">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
