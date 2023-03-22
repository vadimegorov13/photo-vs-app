<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { enhance, applyAction } from "$app/forms";
  import MyInput from "$lib/components/MyInput.svelte";
  import { getImageUrl } from "$lib/helpers/helpers";
  import { Icon, Pencil } from "svelte-hero-icons";

  export let data;
  let loading: boolean;

  $: loading = false;

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

  const submitUpdateProfile = async () => {
    loading = true;
    return async ({ result }: any) => {
      switch (result.type) {
        case "success":
          await invalidateAll();
          break;
        case "error":
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

<div class="flex flex-col w-full h-full">
  <form
    method="POST"
    action="?/updateProfile"
    class="flex flex-col items-center space-y-2 w-full"
    enctype="multipart/form-data"
    use:enhance={submitUpdateProfile}
  >
    <h3 class="text-2xl font-medium">Update Profile</h3>
    <div class="form-conrtol w-full max-w-lg">
      <label for="avatar" class="label font-medium pb-1">
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
            src={data.user.avatar
              ? getImageUrl(data.user.collectionId, data.user.id, data.user.avatar)
              : `https://avatars.dicebear.com/api/jdenticon/${data.user.id}.svg`}
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
        disabled={loading}
      />
    </div>
    <MyInput
      id="username"
      label="Username"
      value={data.user.username}
      placeholder="Enter your username"
      disabled={loading}
      required
    />

    <div class="w-full max-w-xs pt-3">
      <button
        class="btn bg-primary w-full max-w-xs text-white hover:bg-purple-700 delay-100"
        disabled={loading}
      >
        Update Profile
      </button>
    </div>
  </form>
</div>
