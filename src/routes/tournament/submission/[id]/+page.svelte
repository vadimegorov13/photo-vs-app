<script lang="ts">
  export let data;
</script>

<div class="flex flex-col items-center h-full w-full pt-12">
  <h2 class="mt-2 text-center text-3xl font-bold text-primary">Submit your photos</h2>

  <div class="bg-base-100 py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
    <form method="POST" action="?/upload" class="flex flex-col items-center space-y-2 w-full">
      <div class="form-control w-full max-w-xs">
        <label for="title" class="label font-medium pb-1">
          <span class="label-text">Title</span>
        </label>
        <input type="text" name="title" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs">
        <label for="description" class="label font-medium pb-1">
          <span class="label-text">Description</span>
        </label>
        <input type="text" name="description" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs">
        <label for="file" class="label font-medium pb-1">
          <span class="label-text">Photo</span>
        </label>
        <input type="file" name="file" class="file-input file-input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs">
        <input
          type="text"
          name="tournamentId"
          class="input input-bordered w-full max-w-xs"
          value={data.id}
          hidden
        />
      </div>

      <div class="w-full max-w-xs">
        <button class="btn bg-primary w-full max-w-xs text-white hover:bg-purple-700 delay-100">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
