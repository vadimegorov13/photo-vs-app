import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(3, { message: "Email is required" })
    .max(64, { message: "Email must be less than 64 characters" })
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be less than 32 characters" })
    .trim(),
});

export const registerSchema = z
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
      .min(6, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be less than 32 characters" })
      .trim(),
    passwordConfirm: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 8 characters long" })
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

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(3, { message: "Email is required" })
    .max(64, { message: "Email must be less than 64 characters" })
    .email(),
});

export const changeUsernameSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(64, { message: "Username must be less than 64 characters" })
    .trim(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be less than 32 characters" })
      .trim(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be less than 32 characters" })
      .trim(),
    passwordConfirm: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be less than 32 characters" })
      .trim(),
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

export const createTournamentSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(64, { message: "Title must be less than 64 characters" })
    .trim(),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(256, { message: "Description must be less than 256 characters" })
    .trim(),
  maxPlayers: z
    .number({ required_error: "Number for the maximum amount of players is required" })
    .min(2, { message: "There must be at least 2 players" })
    .max(16, { message: "There can be a maximum of 10 players" })
    .positive(),
  maxSubmissions: z
    .number({
      required_error: "Number for the maximum amount of submissions is required",
    })
    .min(1, { message: "There must be at least 1 submission per player" })
    .max(10, { message: "There can be a maximum of 10 submissions per player" })
    .positive(),
});

export const joinSchema = z.object({
  joinCode: z
    .string({ required_error: "Code is required" })
    .min(6, { message: "Code is required" })
    .max(6, { message: "Code must be 6 digits long" })
    .trim(),
});
