import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = ({ locals }) => {
  locals.pb.authStore.clear();

  throw redirect(303, "/");
};
