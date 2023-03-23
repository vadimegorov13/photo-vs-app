import { submissionSchema } from "$lib/validation/zodValidation";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params }) => {
  if (params.id) {
    return {
      id: params.id,
    };
  }

  throw error(404, "Not Found");
};

export const actions: Actions = {
  upload: async ({ locals, request }) => {
    const data = await request.formData();

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const tournamentId = data.get("tournamentId") as string;
    const image = data.get("image");

    const userId: string | undefined = locals.pb.authStore.model?.id;

    try {
      if (!userId) {
        throw redirect(303, "/login");
      }

      if (!image) {
        throw error(400, "Please upload an image");
      }

      submissionSchema.parse(Object.fromEntries(data));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userTournament: any = await locals.pb
        .collection("userTournament")
        .getFirstListItem(`user="${userId}" && tournament="${tournamentId}"`, {
          expand: "tournament",
        });

      if (userTournament.submissions.length >= userTournament.expand.tournament.maxSubmissions) {
        throw error(406, "You've riched the limit of submissions");
      }

      const newFormData = new FormData();
      newFormData.append("title", title);
      newFormData.append("description", description);
      newFormData.append("user", userId);
      newFormData.append("userTournament", userTournament.id);
      newFormData.append("image", image);

      const submission = await locals.pb.collection("submission").create(newFormData);

      await locals.pb
        .collection("userTournament")
        .update(userTournament.id, { submissions: [...userTournament.submissions, submission.id] });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code === 400) {
        const errors = { image: ["Something went wrong"] };

        return {
          data: { title, description },
          errors,
        };
      }

      if (err?.status === 406) {
        const errors = { image: [err.body.message] };

        return {
          data: { title, description },
          errors,
        };
      }

      if (err?.status === 400) {
        const errors = { image: [err.body.message] };

        return {
          data: { title, description },
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      return {
        data: { title, description },
        errors,
      };
    }

    throw redirect(303, "/tournament/list");
  },
};
