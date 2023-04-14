<script lang="ts">
  import { page } from "$app/stores";
  import { ValidatedInput } from "$lib/components";

  export let form;

  let search: string;

  $: search = $page.url.search ?? "";
</script>

<svelte:head>
  <title>PhotoVS | Register</title>
</svelte:head>

<div class="flex flex-col items-center mx-10">
  <div class="m-10 mb-4">
    <h2 class="text-primary text-center text-3xl font-bold">Register</h2>
    <p class="text-black text-center">
      Or
      <a
        href="/login{search}"
        class="text-primary font-medium hover:cursor-pointer hover:underline"
      >
        login
      </a>
      if you already have an account.
    </p>
  </div>

  <div class="max-w-md">
    <form method="POST" class="flex flex-col">
      <ValidatedInput
        id="username"
        value={form?.data?.username ?? ""}
        label="Username"
        errors={form?.errors?.username}
        autocomplete="username"
      />

      <ValidatedInput
        id="email"
        type="email"
        value={form?.data?.email ?? ""}
        label="Email"
        errors={form?.errors?.email}
        autocomplete="email"
      />

      <div class="grid grid-cols-2 gap-4">
        <div>
          <ValidatedInput
            id="password"
            type="password"
            label="Password"
            errors={form?.errors?.password}
            customClass="w-full max-w-md"
            autocomplete="current-password"
          />
        </div>

        <div>
          <ValidatedInput
            id="passwordConfirm"
            type="password"
            label="Confirm Password"
            errors={form?.errors?.passwordConfirm}
            customClass="w-full max-w-md"
            autocomplete="current-password"
          />
        </div>
      </div>

      <!-- <div class="form-control my-2">
        <label class="label cursor-pointer justify-start space-x-2">
          <input
            type="checkbox"
            name="terms"
            class="checkbox checkbox-primary rounded-sm {form?.errors?.terms
              ? 'border-error'
              : 'border-primary'}"
          />
          <span class="label-text">I accept the terms and conditions</span>
        </label>
        {#if form?.errors?.terms}
          <label for="terms" class="label">
            <span class="label-text-alt text-error">{form?.errors.terms[0]}</span>
          </label>
        {/if}
      </div> -->

      <button class="btn btn-primary w-full max-w-md rounded-sm mt-4">Register</button>
    </form>
  </div>
</div>
