import { validateProtectedRoutes } from "$lib/validation/validateProtectedRoutes";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = (event) => {
  const user = event.locals.user;
  validateProtectedRoutes(event);

  return {
    user,
  };
};
