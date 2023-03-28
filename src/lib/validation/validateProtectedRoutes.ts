import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

export const validateProtectedRoutes = (event: RequestEvent) => {
  const urlStartsWith = (url: string) => event.url.pathname.startsWith(url);
  const authorized = event.locals.pb.authStore.isValid;

  if ((urlStartsWith("/login") || urlStartsWith("/register")) && authorized) {
    throw redirect(303, "/");
  }

  if ((urlStartsWith("/tournament") || urlStartsWith("/my")) && !authorized) {
    throw redirect(303, handleLoginRedirect(event));
  }
};

const handleLoginRedirect = (
  event: RequestEvent,
  message = "You must be logged in to access this page"
) => {
  const redirectTo = event.url.pathname + event.url.search;
  return `/login?redirectTo=${redirectTo}&message=${message}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const redirectTo = (url: any) => {
  const redirectTo = url.searchParams.get("redirectTo");

  if (redirectTo) {
    throw redirect(303, `/${redirectTo.slice(1)}`);
  }

  throw redirect(303, "/");
};
