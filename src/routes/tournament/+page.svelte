<div class="flex flex-col items-center h-full w-full pt-12">
  <h2 class="mt-2 text-center text-3xl font-bold text-primary">Create tournament</h2>
  
  <div class="bg-base-100 py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
    <form method="POST" action="?/create" class="flex flex-col items-center space-y-2 w-full">
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
        <label for="maxPlayers" class="label font-medium pb-1">
          <span class="label-text"># of Participants</span>
        </label>
        <input type="number" name="maxPlayers" class="input input-bordered w-full max-w-xs" min="2" max="32" />
      </div>
      
      <div class="form-control w-full max-w-xs">
        <label for="maxSubmissions" class="label font-medium pb-1">
          <span class="label-text"># of Submissions</span>
        </label>
        <input type="number" name="maxSubmissions" class="input input-bordered w-full max-w-xs" min="1" max="32" />
      </div>
      

      <div class="w-full max-w-xs">
        <button class="btn bg-primary w-full max-w-xs text-white hover:bg-purple-700 delay-100">
          Create Tournament
        </button>
      </div>
    </form>
  </div>
</div>
