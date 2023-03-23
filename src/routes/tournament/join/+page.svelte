<script>
  import ValidatedInput from "$lib/components/inputs/ValidatedInput.svelte";

  export let form;
</script>

<div class="flex flex-col items-center mx-10 sm:mx-20">
  <div class="py-6 w-full max-w-md mt-6">
    <form method="POST" action="?/join" class="flex flex-col items-center space-y-2 w-full">
      <ValidatedInput
        id="joinCode"
        value={form?.data?.joinCode ?? ""}
        label="Join Code"
        errors={form?.errors?.joinCode}
      />

      <div class="w-full max-w-md mt-6">
        <button class="btn btn-primary w-full">Join</button>
      </div>
    </form>
  </div>
</div>
