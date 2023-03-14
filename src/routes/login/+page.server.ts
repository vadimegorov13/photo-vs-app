import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from "zod";

type LoginUser = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(3, { message: "Email is required" })
    .max(64, { message: "Email must be less than 64 characters" })
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" })
    .trim(),
});

export const load: ServerLoad = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(307, "/");
  }
  return {};
};

export const actions: Actions = {
  login: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as LoginUser;

    try {
      loginSchema.parse(data);
      await locals.pb.collection("users").authWithPassword(data.email, data.password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { email } = data;

      if (err?.response?.code === 400) {
        const errors = { password: ["Wrong email or password"] };

        return {
          data: { email },
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      return {
        data: { email },
        errors,
      };
    }

    throw redirect(303, "/");
  },
};
