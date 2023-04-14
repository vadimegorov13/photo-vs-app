import type { PbError } from "$lib/types";
import { redirect, type HttpError } from "@sveltejs/kit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlePocketBaseError = (err: PbError, action: string | null = null) => {
  let errors = {};

  if (err.response.data.email) {
    errors = { ...errors, email: ["Email is already in use"] };
  }

  if (err.response.data.username) {
    errors = { ...errors, username: ["Username is already in use"] };
  }

  if (err.response.data.oldPassword) {
    errors = { ...errors, oldPassword: ["Password did not match"] };
  }

  if (err.response.message.includes("Failed to authenticate")) {
    return { password: ["Wrong email or password"] };
  }

  if (action === "create") {
    return { title: ["Something went wrong"] };
  }

  if (action === "joinCode") {
    if (err.status === 400) {
      return { joinCode: ["Something went wrong"] };
    }
    if (err.status === 404) {
      return { joinCode: ["Couldn't find the tournament"] };
    }
  }

  if (action === "load") {
    if (err.status === 400) {
      return { message: ["Something went wrong"] };
    }
    if (err.status === 404) {
      return { message: ["This tournament doesn't exist"] };
    }
  }

  if (action === "upload") {
    if (err.response.code === 404 || err.response.code === 400) {
      return { image: ["Something went wrong"] };
    }
  }

  if (action === "edit") {
    if (err.response.code === 404 || err.response.code === 400) {
      return { title: ["Something went wrong"] };
    }
  }

  if (action === "start") {
    if (err.response.code === 404 || err.response.code === 400) {
      return { message: ["Something went wrong"] };
    }
  }

  if (action === "changeEmail") {
    if (err.response.code === 400) {
      return { email: ["This email is already in use"] };
    }
  }

  return errors;
};

const handleHttpError = (err: HttpError, action: string | null = null) => {
  if (err.status === 401) {
    throw redirect(303, "/login");
  }

  if (action === "joinCode") {
    if (err?.status === 409) {
      return { joinCode: [err.body.message] };
    }
  }

  if (action === "join") {
    if (err?.status === 409) {
      return { message: [err.body.message] };
    }
  }

  if (action === "upload") {
    if (err?.status === 406) {
      return { image: [err.body.message] };
    }

    if (err?.status === 400) {
      return { image: [err.body.message] };
    }
  }

  if (action === "start") {
    if (err?.status === 400) {
      return { message: [err.body.message] };
    }
  }

  if (action === "vote") {
    if (err?.status === 400) {
      return { message: [err.body.message] };
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (err: any, action: string | null = null) => {
  if (err.response?.code) {
    return handlePocketBaseError(err, action);
  }

  if (err.body) {
    return handleHttpError(err, action);
  }

  return err.flatten().fieldErrors;
};
