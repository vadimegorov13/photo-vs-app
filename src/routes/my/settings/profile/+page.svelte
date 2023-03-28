<script lang="ts">
  import { ValidatedInput } from "$lib/components/inputs";
  import { getImageUrl } from "$lib/helpers";
  import { Icon, Pencil } from "svelte-hero-icons";

  export let data;
  export let form;

  interface FormEventHandler<T> {
    target: EventTarget | null;
  }

  const showPreview = (event: FormEventHandler<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const files = target?.files;

    if (files && files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const preview = document.getElementById("avatar-preview");
      // @ts-ignore
      if (preview) preview.src = src;
    }
  };
</script>

<div class="flex flex-col">
  <form
    method="POST"
    action="?/updateProfile"
    class="flex flex-col w-full"
    enctype="multipart/form-data"
  >
    <div class="form-control flex flex-col items-center">
      <h3 class="text-2xl font-medium">Update Profile</h3>
      <div class="divider" />

      <label for="avatar" class="label font-medium">
        <span class="label-text">Profile Picture</span>
      </label>
      <label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
        <label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
          <span class="btn btn-circle btn-small btn-secondary">
            <Icon class="w-4 h-4" src={Pencil} />
          </span>
        </label>
        <div class="w-32 rounded-full">
          <img
            src={data.user?.avatar
              ? getImageUrl(data.user.collectionId, data.user.id, data.user.avatar)
              : `https://avatars.dicebear.com/api/jdenticon/${data.user?.id}.svg`}
            alt="user avatar"
            id="avatar-preview"
          />
        </div>
      </label>
      <input
        type="file"
        name="avatar"
        id="avatar"
        value=""
        accept="image/*"
        hidden
        on:change={showPreview}
      />
    </div>
    <div class="flex flex-col items-center">
      <ValidatedInput
        id="username"
        value={form?.data?.username ?? data.user?.username}
        label="Username"
        placeholder="Enter your username"
        errors={form?.errors?.username}
      />

      <div class="w-full max-w-md pt-3">
        <button class="btn btn-primary w-full">Update Profile</button>
      </div>
      {#if form?.success === true}
        <div class="alert alert-success shadow-lg mt-6 max-w-md">
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
            <span>Your profile has been updated!</span>
          </div>
        </div>
      {/if}
    </div>
  </form>
</div>
