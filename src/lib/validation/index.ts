import { validateProtectedRoutes, redirectTo } from "$lib/validation/validateProtectedRoutes";
import { validateTournamentEntry } from "$lib/validation/validateTournamentEntry";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  changePasswordSchema,
  changeUsernameSchema,
  createTournamentSchema,
  joinSchema,
  submissionSchema,
} from "$lib/validation/zodValidation";

export {
  validateProtectedRoutes,
  redirectTo,
  validateTournamentEntry,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  changePasswordSchema,
  changeUsernameSchema,
  createTournamentSchema,
  joinSchema,
  submissionSchema,
};
