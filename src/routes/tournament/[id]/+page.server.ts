import { serializeNonPOJOs } from "$lib/helpers";
import { error, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  if (params.id) {
    const id = params.id;

    try {
      const tournament = await locals.pb.collection("tournament").getOne(id, {
        expand: "registeredUsers, registeredUsers.user, registeredUsers.submissions",
      });

      return {
        tournament: serializeNonPOJOs(tournament),
      };
    } catch (err) {
      return {
        errors: ["Something went wrong"],
      };
    }
  }

  throw error(404, "Not Found");
};
