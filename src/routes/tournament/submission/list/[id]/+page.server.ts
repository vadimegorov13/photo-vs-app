import { serializeNonPOJOs } from "$lib/helpers/helpers";
import { submissionSchema } from "$lib/validation/zodValidation";
import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  if (params.id) {
    const userId: string | undefined = locals.pb.authStore.model?.id;
    const id = params.id;

    const submissions = await locals.pb
      .collection("submission")
      .getList(1, 32, { filter: `user="${userId}" && userTournament="${id}"`, sort: "-created" });

    return {
      id,
      submissions: serializeNonPOJOs(submissions.items),
    };
  }

  throw redirect(303, "/tournament/list");
};

type DeleteSubmission = {
  id: string;
};

type EditSubmission = {
  id: string;
  title: string;
  description: string;
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
    const data = Object.fromEntries(await request.formData()) as EditSubmission;

    try {
      submissionSchema.parse(data);

      await locals.pb
        .collection("submission")
        .update(data.id, { title: data.title, description: data.description });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { title, description } = data;

      console.log(serializeNonPOJOs(err));

      if (err?.response?.code === 400) {
        const errors = { title: ["Something went wrong"] };

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
