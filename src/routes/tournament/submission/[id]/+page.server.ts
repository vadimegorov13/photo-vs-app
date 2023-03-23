import { serializeNonPOJOs } from "$lib/helpers/helpers";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params }) => {
  if (params.id) {
    return {
      id: params.id,
    };
  }

  throw error(404, "Not Found");
};

type SubmissionCreate = {
  title: string;
  description: string;
  tournamentId: string;
  file: File;
};

export const actions: Actions = {
  upload: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as SubmissionCreate;
    const userId: string | undefined = locals.pb.authStore.model?.id;

    try {
      if (!userId) {
        throw error(404, "no userId");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = serializeNonPOJOs(err);

      console.log(error.response.data.image);
      return error;
    }

    throw redirect(303, "/");
  },
};
