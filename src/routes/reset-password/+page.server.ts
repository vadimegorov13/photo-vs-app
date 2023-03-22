import { error, type Actions } from "@sveltejs/kit";

type ResetPassword = {
  email: string;
};

export const actions: Actions = {
  resetPassword: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as ResetPassword;

    try {
      await locals.pb.collection("users").requestPasswordReset(data.email);
      return {
        success: true,
      };
    } catch (err) {
      console.log("Error: ", err);
      throw error(500, "Something went wrong");
    }
  },
};
