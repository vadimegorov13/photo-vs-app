import { serializeNonPOJOs } from "$lib/helpers";
import type { ServerLoad } from "@sveltejs/kit";

type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
};

export const load: ServerLoad = ({ locals }) => {
  const user = locals.pb.authStore.model;

  return {
    user: serializeNonPOJOs(user) as User,
  };
};
