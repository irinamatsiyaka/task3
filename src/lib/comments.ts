import type { AppUser } from "../types/user";
import type { Comment } from "../types/comment";

function getKey(todoId: string): string {
   return `comments_${todoId}`;
}

export function getComments(todoId: string): Comments[] {
   const data = localStorage.getItem(getKey(todoId));
   return data ? JSON.parse(data) : [];
}

export function addComment(todoId: string, user: AppUser, text: string): void {
   const comments = getComments(todoId);
   const newComment: Comment = {
      id: crypto.randomUUID(),
      todoId,
      author: user.name,
      text,
      createdAt: new Date().toISOString(),
   };
   localStorage.setItem(
      getKey(todoId),
      JSON.stringify([...comments, newComment])
   );
}
