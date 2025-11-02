import { describe, it, expect } from "vitest";
import { validateUser } from "../validateUser";

describe("User validation snapshot test", () => {
   it("should match snapshot for empty fields", () => {
      const result = validateUser("", "");
      expect(result).toMatchSnapshot();
   });

   it("should match snapshot for short password", () => {
      const result = validateUser("irina", "123");
      expect(result).toMatchSnapshot();
   });

   it("should match snapshot for valid data", () => {
      const result = validateUser("irina", "securePass");
      expect(result).toMatchSnapshot();
   });
});
