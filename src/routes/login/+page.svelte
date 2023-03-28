<script lang="ts">
  import ValidatedInput from "$lib/components/inputs/ValidatedInput.svelte";
  import { page } from "$app/stores";

  export let form;
  let message: string;
  let search: string;

  $: search = $page.url.search ?? "";

  $: message = $page.url.searchParams.get("message") ?? "";
</script>

<div class="flex flex-col items-center w-full">
  <div class="m-10">
    {#if message}
      <p class="alert alert-error mb-4">
        {message}
      </p>
    {/if}
    <h2 class="text-primary text-center text-3xl font-bold">Login</h2>
    <p class="text-black">
      Or
      <a href={`/register${search}`} class="text-primary font-medium hover:cursor-pointer hover:underline">
        register
      </a>
      if you don't already have an account.
    </p>
  </div>

  <div class="shadow-lg rounded-lg p-8 max-w-md min-w-[24.5rem]">
    <form method="POST" class="flex flex-col">
      <ValidatedInput
        id="email"
        type="email"
        value={form?.data?.email ?? ""}
        label="Email"
        errors={form?.errors?.email}
      />
      <ValidatedInput
        id="password"
        type="password"
        label="Password"
        errors={form?.errors?.password}
      />
      <a
        href="/reset-password"
        class="font-medium hover:cursor-pointer hover:underline hover:text-primary mb-4"
      >
        Forgot Password?
      </a>
      <button class="btn btn-primary w-full max-w-md">Login</button>
    </form>
  </div>
</div>
