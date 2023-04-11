<script lang="ts">
  import { Alert, ValidatedInput } from "$lib/components";
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
  <form method="POST" class="flex flex-col w-full" enctype="multipart/form-data">
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

      <div class="w-full max-w-md mb-4">
        <button class="btn btn-primary w-full rounded-sm mt-4">Update Profile</button>
      </div>
      <div class="w-full max-w-md">
        {#if form?.success === true}
          <Alert alertType="success" customClass="max-w-md w-full"
            >Your profile has been updated!</Alert
          >
        {/if}
      </div>
    </div>
  </form>
</div>
