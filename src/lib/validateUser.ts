import {
   ERROR_USERNAME_REQUIRED,
   ERROR_PASSWORD_REQUIRED,
   ERROR_PASSWORD_TOO_SHORT,
} from "../constants/messages";

export function validateUser(
   username: string,
   password: string
): Record<string, string> {
   const errors: Record<string, string> = {};

   if (!username.trim()) errors.username = ERROR_USERNAME_REQUIRED;
   if (!password.trim()) errors.password = ERROR_PASSWORD_REQUIRED;
   if (password.length > 0 && password.length < 5)
      errors.password = ERROR_PASSWORD_TOO_SHORT;

   return errors;
}
