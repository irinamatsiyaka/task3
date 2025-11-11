import { describe, it, expect, beforeEach } from "vitest";
import {
   createUser,
   signIn,
   readUsers,
   signOut,
   getCurrentUser,
} from "../auth";

describe("Auth module", () => {
   beforeEach(() => {
      localStorage.clear();
   });

   it("should create a new user", () => {
      const newUser = createUser("irina", "1111", "Irina");
      const allUsers = readUsers();

      expect(newUser.username).toBe("irina");
      expect(allUsers.length).toBe(1);
      expect(allUsers[0].username).toBe("irina");
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

   it("should not allow duplicate usernames", () => {
      createUser("bob", "123", "Bob");
      expect(() => createUser("bob", "123", "Bob2")).toThrowError(
         /already taken/i
      );
   });
});
