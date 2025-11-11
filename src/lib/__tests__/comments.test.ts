import { describe, it, expect, beforeEach } from "vitest";
import { addComment, getComments } from "../comments";

describe("comments module", () => {
   beforeEach(() => {
      localStorage.clear();
   });

   it("should add a comment to localstorage", () => {
      const fakeUser = { id: 1, username: "irina", name: "Irina" };
      addComment("1", fakeUser, "test comment");
      const comments = getComments("1");

      expect(comments.length).toBe(1);
      expect(comments[0].text).toBe("test comment");
      expect(comments[0].author).toBe("Irina");
   });
});
