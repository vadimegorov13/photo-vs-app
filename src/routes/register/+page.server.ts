import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from "zod";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const registerSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(64, { message: "Username must be less than 64 characters" })
      .trim(),
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
    passwordConfirm: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be less than 32 characters" })
      .trim(),
    terms: z.enum(["on"], { required_error: "You must accept the terms and conditions" }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["password"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["passwordConfirm"],
      });
    }
  });

export const load: ServerLoad = async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(307, "/");
  }
  return;
};

export const actions: Actions = {
  register: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as RegisterUser;

    try {
      registerSchema.parse(data);
      console.log(data);

      await locals.pb.collection("users").create(data);
      await locals.pb.collection("users").authWithPassword(data.email, data.password);

      locals.pb.authStore.clear();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { username, email } = data;

      if (err?.response?.code === 400) {
        let errors = {};

        if (err.response.data.email) {
          errors = { ...errors, email: ["Email is already in use"] };
        }

        if (err.response.data.username) {
          errors = { ...errors, username: ["Username is already in use"] };
        }
        return {
          data: { username, email },
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      console.log({ username, email }, errors);

      return {
        data: { username, email },
        errors,
      };
    }

    throw redirect(303, "/login");
  },
};
