<script>
  import ValidatedInput from "$lib/components/inputs/ValidatedInput.svelte";

  export let form;
</script>

<div class="flex flex-col justify-center">
  <form action="?/updatePassword" method="POST" class="flex flex-col space-y-2 w-full">
    <div class="form-control flex flex-col items-center">
      <h3 class="text-2xl font-medium">Change Password</h3>
      <div class="divider" />
      <ValidatedInput
        id="oldPassword"
        type="password"
        label="Old Password"
        errors={form?.errors?.oldPassword}
        value=""
      />
      <ValidatedInput
        id="password"
        type="password"
        label="New Password"
        errors={form?.errors?.password}
        value=""
      />
      <ValidatedInput
        id="passwordConfirm"
        type="password"
        label="Confirm New Password"
        errors={form?.errors?.passwordConfirm}
        value=""
      />
      <a href="/reset-password" class="text-primary hover:cursor-point hover:underline">
        I forgot my password</a
      >
      <div class="w-full max-w-md pt-3">
        <button type="submit" class="btn btn-primary w-full max-w-md"> Update Password </button>
      </div>
    </div>
  </form>
</div>
