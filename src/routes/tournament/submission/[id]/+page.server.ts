import { handleError } from "$lib/validation";
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
  create: async ({ locals, request }) => {
    const userId: string | undefined = locals.user?.id;
    const data = await request.formData();

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const tournamentId = data.get("tournamentId") as string;
    const image = data.get("image") as File;

    try {
      if (!userId) throw error(401, "Unauthorized");
      if (!image.size) throw error(400, "Please upload an image");

      submissionSchema.parse(Object.fromEntries(data));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userTournament: any = await locals.pb
        .collection("userTournament")
        .getFirstListItem(`user="${userId}" && tournament="${tournamentId}"`, {
          expand: "tournament",
        });

      if (userTournament.submissions.length >= userTournament.expand.tournament.maxSubmissions) {
        throw error(406, "You have reached the maximum amount of submissions");
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
      return {
        data: { title, description },
        errors: handleError(err, "upload"),
      };
    }

    throw redirect(303, "/tournament/list");
  },
  delete: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;

    try {
      await locals.pb.collection("submission").delete(id);

      return {
        success: true,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code) {
        const errors = { message: ["Something went wrong"] };

        return {
          success: false,
          errors,
        };
      }
    }
  },
  edit: async ({ locals, request }) => {
    const data = await request.formData();

    const id = data.get("id") as string;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const image = data.get("image") as File;

    try {
      const submissionData = new FormData();
      submissionData.append("title", title);
      submissionData.append("description", description);

      if (image.size !== 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        submissionData.append("image", data.get("image") as any);
      }

      submissionSchema.parse(Object.fromEntries(data));

      await locals.pb.collection("submission").update(id, submissionData);

      return {
        success: true,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        data: { title, description },
        errors: handleError(err, "edit"),
      };
    }
  },
};
