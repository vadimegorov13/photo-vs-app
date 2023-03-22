<script lang="ts">
  export let form;
</script>

<div class="flex flex-col items-center h-full w-full mt-12">
  <h2 class="mt-2 text-center text-3xl font-bold text-primary">Login to your account</h2>
  <p class="text-center mt-1 text-base-100">
    Or <a href="/register" class="text-primary font-medium hover:cursor-pointer">register</a> if you
    don't already have an account.
  </p>
  <div class="bg-base-100 py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
    <form method="POST" action="?/login" class="flex flex-col items-center space-y-2 w-full">
      <div class="form-control w-full max-w-xs">
        <label for="email" class="label font-medium pb-1">
          <span class="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          class="input w-full max-w-xs  {form?.errors?.email ? 'input-error' : 'input-bordered'}"
          value={form?.data?.email ?? ""}
        />
        <label for="email" class="label">
          {#if form?.errors?.email}
            <span class="label-text-alt text-error">{form?.errors.email[0]}</span>
          {/if}
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="password" class="label font-medium pb-1">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          class="input w-full max-w-xs  {form?.errors?.password ? 'input-error' : 'input-bordered'}"
        />
        <label for="password" class="label">
          {#if form?.errors?.password}
            <span class="label-text-alt text-error">{form?.errors.password[0]}</span>
          {/if}
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <a
          href="/reset-password"
          class="font-medium hover:cursor-pointer hover:underline hover:text-primary"
        >
          Forgot Password?
        </a>
      </div>
      <div class="w-full max-w-xs pt-3">
        <button class="btn bg-primary w-full max-w-xs text-white hover:bg-purple-700 delay-100"
          >Login
        </button>
      </div>
    </form>
  </div>
</div>
