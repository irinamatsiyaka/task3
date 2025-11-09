import { describe, it, expect, beforeEach } from "vitest";
import { createUser, signIn, signOut, getCurrentUser } from "../auth";

describe("Auth module", () => {
   beforeEach(() => {
      localStorage.clear();
   });

   it("should sign in existing user correctly", () => {
      createUser("alex", "abc123");
      const loggedIn = signIn("alex", "abc123");

      expect(loggedIn.username).toBe("alex");
      expect(loggedIn.id).toBeTypeOf("number");
   });

   it("should create, login, and logout user successfully", () => {
      createUser("alex", "pass1", "Alex");
      const logged = signIn("alex", "pass1");
      expect(logged.username).toBe("alex");

      signOut();
      expect(getCurrentUser()).toBeNull();
   });
});
