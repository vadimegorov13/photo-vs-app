<script lang="ts">
  export let form;
</script>

<div class="flex flex-col items-center h-full w-full pt-12">
  <h2 class="mt-2 text-center text-3xl font-bold text-primary">Register for an account</h2>
  <p class="text-center mt-1 text-base-100">
    Or <a href="/login" class="text-primary font-medium hover:cursor-pointer">login</a> if you already
    have an account.
  </p>
  <div class="bg-base-100 py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
    <form method="POST" action="?/register" class="flex flex-col items-center space-y-2 w-full">
      <div class="form-control w-full max-w-xs">
        <label for="username" class="label font-medium pb-1">
          <span class="label-text">Username</span>
        </label>
        <input
          type="text"
          name="username"
          class="input {form?.errors?.username ? 'input-error' : 'input-bordered'} w-full max-w-xs"
          value={form?.data?.username ?? ""}
        />
        <label for="username" class="label">
          {#if form?.errors?.username}
            <span class="label-text-alt text-error">{form?.errors.username[0]}</span>
          {/if}
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="email" class="label font-medium pb-1">
          <span class="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          class="input {form?.errors?.email ? 'input-error' : 'input-bordered'} w-full max-w-xs"
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
          class="input {form?.errors?.password ? 'input-error' : 'input-bordered'} w-full max-w-xs"
        />
        <label for="password" class="label">
          {#if form?.errors?.password}
            <span class="label-text-alt text-error">{form?.errors.password[0]}</span>
          {/if}
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="passwordConfirm" class="label font-medium pb-1">
          <span class="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          name="passwordConfirm"
          class="input {form?.errors?.passwordConfirm
            ? 'input-error'
            : 'input-bordered'} w-full max-w-sm"
        />
        <label for="passwordConfirm" class="label">
          {#if form?.errors?.passwordConfirm}
            <span class="label-text-alt text-error">{form?.errors.passwordConfirm[0]}</span>
          {/if}
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label cursor-pointer justify-start space-x-4">
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
            <span class="label-text-alt text-error">{form?.errors.terms[0]}</span>
          {/if}
        </label>
      </div>
      <div class="w-full max-w-xs">
        <button class="btn bg-primary w-full max-w-xs text-white hover:bg-purple-700 delay-100">
          Register
        </button>
      </div>
    </form>
  </div>
</div>
