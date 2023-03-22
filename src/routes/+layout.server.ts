import { serializeNonPOJOs } from "$lib/helpers/helpers";
import { validateProtectedRoutes } from "$lib/validation/validateProtectedRoutes";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = (event) => {
  const user = event.locals.pb.authStore.model;
  validateProtectedRoutes(event);

  return {
    user: serializeNonPOJOs(user),
  };
};
