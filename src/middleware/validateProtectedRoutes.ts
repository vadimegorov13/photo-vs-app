import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

export const validateProtectedRoutes = (event: RequestEvent) => {
  if (
    event.url.pathname.startsWith("/login") &&
    event.url.pathname.startsWith("/register") &&
    event.locals.pb.authStore.isValid
  ) {
    throw redirect(303, "/");
  }
};
