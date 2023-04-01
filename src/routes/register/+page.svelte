<script lang="ts">
  import { page } from "$app/stores";
  import { ValidatedInput } from "$lib/components";;

  export let form;

  let search: string;

  $: search = $page.url.search ?? "";
</script>

<div class="flex flex-col items-center">
  <div class="m-10">
    <h2 class="text-primary text-center text-3xl font-bold">Register</h2>
    <p class="text-black">
      Or
      <a href="/login{search}" class="text-primary font-medium hover:cursor-pointer hover:underline">
        login
      </a>
      if you already have an account.
    </p>
  </div>

  <div class="shadow-lg rounded-lg p-8 max-w-md">
    <form method="POST" class="flex flex-col">
      <ValidatedInput
        id="username"
        value={form?.data?.username ?? ""}
        label="Username"
        errors={form?.errors?.username}
      />

      <ValidatedInput
        id="email"
        type="email"
        value={form?.data?.email ?? ""}
        label="Email"
        errors={form?.errors?.email}
      />

      <div class="flex">
        <div class="grid flex-grow">
          <ValidatedInput
            id="password"
            type="password"
            label="Password"
            errors={form?.errors?.password}
            customClass="w-full max-w-md"
          />
        </div>

        <div class="divider divider-horizontal" />

        <div class="grid flex-grow">
          <ValidatedInput
            id="passwordConfirm"
            type="password"
            label="Confirm Password"
            errors={form?.errors?.passwordConfirm}
            customClass="w-full max-w-md"
          />
        </div>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer justify-start space-x-2">
          <input
            type="checkbox"
            name="terms"
            class="checkbox checkbox-primary {form?.errors?.terms
              ? 'border-error'
              : 'border-primary'}"
          />
          <span class="label-text">I accept the terms and conditions</span>
        </label>
        <label for="terms" class="label">
          {#if form?.errors?.terms}
            <span class="label-text-alt text-error mb-2">{form?.errors.terms[0]}</span>
          {/if}
        </label>
      </div>

      <button class="btn btn-primary w-full max-w-md">Register</button>
    </form>
  </div>
</div>
