import { serializeNonPOJOs } from "$lib/helpers";
import { validateProtectedRoutes } from "$lib/validation/validateProtectedRoutes";
import type { ServerLoad } from "@sveltejs/kit";

type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
};

export const load: ServerLoad = (event) => {
  const user = event.locals.pb.authStore.model;
  validateProtectedRoutes(event);

  return {
    user: serializeNonPOJOs(user) as User,
  };
};
