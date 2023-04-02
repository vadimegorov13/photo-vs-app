<script>
  import { ValidatedInput } from "$lib/components";;

  export let form;
</script>

<div class="flex flex-col items-center mx-10 sm:mx-20">
  <div class="py-6 w-full max-w-md">
    <form method="POST" class="flex flex-col items-center space-y-4 w-full">
      <ValidatedInput
        id="joinCode"
        value={form?.data?.joinCode ?? ""}
        label="Join Code"
        errors={form?.errors?.joinCode}
      />

      <div class="w-full max-w-md">
        <button class="btn btn-primary w-full rounded-sm">Join</button>
      </div>
    </form>
  </div>
</div>
