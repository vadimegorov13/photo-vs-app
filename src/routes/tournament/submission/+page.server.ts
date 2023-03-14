import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";

type SubmissionCreate = {
  title: string;
  imageUrl: string;
  tournamentId: string;
};

export const load: ServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(307, "/login");
  }
  return {};
};

export const actions: Actions = {
  create: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as SubmissionCreate;

    try {
      const userId: string | undefined = locals.pb.authStore.model?.id;
      const submissionData = {
        title: data.title,
        imageUrl: data.imageUrl,
        tournamentId: data.tournamentId,
        tournament: data.tournamentId,
        userId,
        user: userId,
      };

      console.log('submissionData:', submissionData);

      const tournament = await locals.pb
        .collection("tournament")
        .getOne(data.tournamentId);

      console.log('tournament', tournament)

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
