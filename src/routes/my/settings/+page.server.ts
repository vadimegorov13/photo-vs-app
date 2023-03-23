import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = () => {
  throw redirect(303, "/my/settings/profile");
};
