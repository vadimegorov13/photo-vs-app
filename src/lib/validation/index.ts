import { redirectTo, validateProtectedRoutes } from "$lib/validation/validateProtectedRoutes";
import { validateTournamentEntry } from "$lib/validation/validateTournamentEntry";
import {
  changePasswordSchema,
  changeUsernameSchema,
  createTournamentSchema,
  joinSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  submissionSchema,
} from "$lib/validation/zodValidation";
import { handleError } from "./handleError";

export {
  changePasswordSchema,
  changeUsernameSchema,
  createTournamentSchema,
  handleError,
  joinSchema,
  loginSchema,
  redirectTo,
  registerSchema,
  resetPasswordSchema,
  submissionSchema,
  validateProtectedRoutes,
  validateTournamentEntry,
};
