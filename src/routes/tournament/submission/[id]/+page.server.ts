import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

type SubmissionCreate = {
  title: string;
  imageUrl: string;
  tournamentId: string;
};

export const load: ServerLoad = async ({ locals, params }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(307, "/login");
  }

  if (params.id) {
    return {
      id: params.id,
    };
  }

  throw error(404, "Not Found");
};

export const actions: Actions = {
  create: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as SubmissionCreate;

    try {
      const userId: string | undefined = locals.pb.authStore.model?.id;
      const submissionData = {
        title: data.title,
        imageUrl: data.imageUrl,
        tournament: data.tournamentId,
        user: userId,
      };
      const tournament = await locals.pb.collection("tournament").getOne(data.tournamentId);
      const submission = await locals.pb.collection("submission").create(submissionData);

      await locals.pb
        .collection("tournament")
        .update(data.tournamentId, { submissions: [...tournament.submissions, submission.id] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      return {
        err,
      };
    }

    throw redirect(303, "/");
  },
};
