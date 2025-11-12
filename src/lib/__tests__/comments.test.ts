import { describe, it, expect, beforeEach } from "vitest";
import { createUser, readUsers } from "../auth";

describe("Auth flow module", () => {
   beforeEach(() => {
      localStorage.clear();
   });

   it("should create a new user and store in localStorage", () => {
      createUser("irina", "1234", "Irina");

      const users = readUsers();
      expect(users.length).toBe(1);
      expect(users[0].username).toBe("irina");
      expect(users[0].name).toBe("Irina");
   });

   it("should not allow duplicate usernames", () => {
      createUser("bob", "1111", "Bob");
      expect(() => createUser("bob", "2222", "AnotherBob")).toThrow(
         /already taken/i
      );
   });
});
