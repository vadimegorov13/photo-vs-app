<script>
  import ValidatedInput from "$lib/components/inputs/ValidatedInput.svelte";

  export let form;
</script>

<div class="flex flex-col items-center">
  <div class="mt-10 mb-4">
    <h2 class="text-primary text-center text-3xl font-bold">Reset Your Password</h2>
    <p class="text-black">We'll send you an email with a link to reset your password.</p>
  </div>

  <form action="?/resetPassword" method="POST" class="flex flex-col items-center w-full max-w-md">
    <ValidatedInput
      id="email"
      type="email"
      value={form?.data?.email ?? ""}
      label="Email"
      errors={form?.errors?.email}
    />
    <button class="btn btn-primary w-full max-w-md">Request Password Reset</button>

    {#if form?.success}
      <div class="alert alert-success shadow-lg w-full max-w-md">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>An email has been sent to reset your password!</span>
        </div>
      </div>
    {/if}
  </form>
</div>
