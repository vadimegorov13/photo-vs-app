<script lang="ts">
  import { page } from "$app/stores";
  import { ValidatedInput } from "$lib/components";
  import Alert from "$lib/components/Alert.svelte";
  export let form;
  let message: string;
  let search: string;

  $: search = $page.url.search ?? "";

  $: message = $page.url.searchParams.get("message") ?? "";
</script>

<div class="flex flex-col mx-10 items-center">
  <div class="m-10 w-full">
    <h2 class="text-primary text-center text-3xl font-bold">Login</h2>
    <p class="text-black text-center">
      Or
      <a
        href="/register{search}"
        class="text-primary font-medium hover:cursor-pointer hover:underline"
      >
        register
      </a>
      if you don't already have an account.
    </p>
  </div>

  <div class="max-w-md w-full">
    <form method="POST" class="flex flex-col">
      {#if message}
        <div class="max-w-md">
          <Alert>
            {message}
          </Alert>
        </div>
      {/if}
      <ValidatedInput
        id="email"
        type="email"
        value={form?.data?.email ?? ""}
        label="Email"
        errors={form?.errors?.email}
        autocomplete="email"
      />
      <ValidatedInput
        id="password"
        type="password"
        label="Password"
        errors={form?.errors?.password}
        autocomplete="current-password"
      />
      <a
        href="/reset-password"
        class="font-medium text-sm hover:cursor-pointer hover:underline hover:text-primary my-4"
      >
        Forgot Password?
      </a>
      <button class="btn btn-primary w-full max-w-md rounded-sm">Login</button>
    </form>
  </div>
</div>
