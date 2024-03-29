import { serializeNonPOJOs } from "$lib/helpers";
import type { User } from "$lib/types";
import type { Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(import.meta.env.VITE_POCKETBASE_API);

  // load the store data from the request cookie string
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    if (event.locals.pb.authStore.isValid) {
      const response = await event.locals.pb.collection("users").authRefresh();
      const user = serializeNonPOJOs(response.record) as User;
      delete user.name;

      event.locals.user = user;
    } else {
      event.locals.user = undefined;
    }
  } catch (_) {
    // clear the auth store on failed refresh
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  response.headers.append("set-cookie", event.locals.pb.authStore.exportToCookie());

  return response;
};
