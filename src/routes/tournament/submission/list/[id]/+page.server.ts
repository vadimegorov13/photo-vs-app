import { serializeNonPOJOs } from "$lib/helpers";
import type { Submission, Tournament } from "$lib/types";
import { submissionSchema } from "$lib/validation";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  if (params.id) {
    const id = params.id;
    const userId = locals.user?.id;

    try {
      if (!userId) throw error(401, "Unauthorized");

      const userTournament = await locals.pb
        .collection("userTournament")
        .getFirstListItem(`user="${userId}" && id="${id}"`, {
          expand: "tournament, submissions, tournament.settings",
        });

      return {
        tournament: serializeNonPOJOs(userTournament.expand.tournament) as Tournament,
        submissions: serializeNonPOJOs(userTournament.expand.submissions) as Submission[],
      };
    } catch (err) {
      throw redirect(303, "/tournament/list");
    }
  }

  throw redirect(303, "/tournament/list");
};

type DeleteSubmission = {
  id: string;
};

export const actions: Actions = {
  delete: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as DeleteSubmission;

    try {
      await locals.pb.collection("submission").delete(data.id);
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

    return {
      success: true,
    };
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code === 400) {
        const errors = { title: ["Something went wrong"] };

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

    return {
      success: true,
    };
  },
};
