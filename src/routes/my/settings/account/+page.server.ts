import { error } from "@sveltejs/kit";

type ChangeEmail = {
  email: string;
};

export const actions = {
  updateEmail: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as ChangeEmail;

    try {
      await locals.pb.collection("users").requestEmailChange(data.email);

      locals.user.email = data.email;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw error(err.status, err.message);
    }

    return {
      success: true,
    };
  }
};
