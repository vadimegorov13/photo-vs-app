import { validateProtectedRoutes } from "$lib/validation";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = (event) => {
  const user = event.locals.user;
  validateProtectedRoutes(event);

  return {
    user,
  };
};
