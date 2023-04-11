<script>
  import { page } from "$app/stores";
  import { Icon, Bars3BottomLeft } from "svelte-hero-icons";

  const navigaiton = [
    {
      title: "Profile",
      href: "/my/settings/profile",
    },
    {
      title: "Account",
      href: "/my/settings/account",
    },
    {
      title: "Security",
      href: "/my/settings/security",
    },
  ];
</script>

<div class="flex justify-center">
  <div class="flex-1 max-w-3xl mx-10">
    <div class="w-full">
      <div class="flex flex-row mt-8">
        <div class="text-2xl font-medium pl-4 pt-2">Settings</div>
        <div class="dropdown dropdown-end sm:hidden ml-auto">
          <button class="btn btn-ghost rounded-sm">
            <Icon class="w-6 h-8" src={Bars3BottomLeft} />
          </button>
          <ul class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-sm w-52 gap-2">
            {#each navigaiton as navItem}
              <a href={navItem.href}>
                <button
                  class="btn btn-primary rounded-sm w-full font-medium {$page.url.pathname ===
                  navItem.href
                    ? 'active '
                    : 'btn-ghost'}"
                >
                  {navItem.title}
                </button>
              </a>
            {/each}
          </ul>
        </div>
      </div>

      <div class="divider" />
    </div>

    <div class="flex">
      <ul class="bg-base-100 w-56 p-2 rounded-box gap-2 hidden sm:menu">
        {#each navigaiton as navItem}
          <a href={navItem.href}>
            <button
              class="btn btn-primary rounded-sm w-full font-medium {$page.url.pathname ===
              navItem.href
                ? 'active '
                : 'btn-ghost'}"
            >
              {navItem.title}
            </button>
          </a>
        {/each}
      </ul>
      <div class="w-full">
        <slot />
      </div>
    </div>
  </div>
</div>
