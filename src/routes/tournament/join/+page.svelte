<script>
  export let form;
</script>

<div class="flex flex-col items-center h-full w-full pt-12">
  <div class="bg-base-100 py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
    <form method="POST" action="?/join" class="flex flex-col items-center space-y-2 w-full">
      <div class="form-control w-full max-w-xs">
        <label for="joinCode" class="label font-medium pb-1">
          <span class="label-text">Join Code</span>
        </label>
        <input
          type="text"
          name="joinCode"
          class="input w-full max-w-xs {form?.errors?.joinCode ? 'input-error' : 'input-bordered'}"
          value={form?.data?.joinCode ?? ""}
        />
        <label for="joinCode" class="label">
          {#if form?.errors?.joinCode}
            <span class="label-text-alt text-error">{form.errors.joinCode[0]}</span>
          {/if}
        </label>
      </div>

      <div class="w-full max-w-xs">
        <button class="btn bg-primary w-full max-w-xs text-white hover:bg-purple-700 delay-100">
          Join
        </button>
      </div>
    </form>
  </div>
</div>
