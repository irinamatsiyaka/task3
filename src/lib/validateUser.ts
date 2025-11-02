export function validateUser(
   username: string,
   password: string
): Record<string, string> {
   const errors: Record<string, string> = {};

   if (!username.trim()) errors.username = "Username is required";
   if (!password.trim()) errors.password = "Password is required";
   if (password.length > 0 && password.length < 5)
      errors.password = "Password must be at least 5 characters long";

   return errors;
}
