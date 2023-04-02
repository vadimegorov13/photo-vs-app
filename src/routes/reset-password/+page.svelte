<script>
  import { ValidatedInput } from "$lib/components";import Alert from "$lib/components/Alert.svelte";
;

  export let form;
</script>

<div class="flex flex-col items-center mx-10 sm:mx-20">
  <div class="mt-10 mb-4">
    <h2 class="text-primary text-center text-3xl font-bold">Reset Your Password</h2>
    <p class="text-black">We'll send you an email with a link to reset your password.</p>
  </div>

  <form method="POST" class="flex flex-col items-center w-full max-w-md">
    <ValidatedInput
      id="email"
      type="email"
      value={form?.data?.email ?? ""}
      label="Email"
      errors={form?.errors?.email}
    />
    <button class="btn btn-primary w-full max-w-md rounded-sm my-4">Request Password Reset</button>

    {#if form?.success}
      <Alert alertType="success">
        An email has been sent to {form?.data?.email} with a link to reset your password.
      </Alert>
    {/if}
  </form>
</div>
