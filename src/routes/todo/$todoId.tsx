import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import type { Todo } from "../../types/todo";
import { getCurrentUser } from "../../lib/auth";
import { addComment, getComments } from "../../lib/comments";
import type { FormEvent } from "react";
import "./todo-details.css";

export const Route = createFileRoute("/todo/$todoId")({
   component: TodoDetails,
});

function TodoDetails(): React.JSX.Element | null {
   const { todoId } = Route.useParams();
   const { data, isLoading, error } = useQuery<Todo>({
      queryKey: ["todo", todoId],
      queryFn: async () => {
         const res = await fetch(`https://dummyjson.com/todos/${todoId}`);
         if (!res.ok) throw new Error("faild to load");
         return res.json();
      },
   });

   const user = getCurrentUser();
   const [comments, setComments] = useState<Comment[]>([]);
   const [commentText, setCommentText] = useState("");

   useEffect(() => {
      setComments(getComments(todoId));
   }, [todoId]);

   function handleAddComment(event: React.FormEvent): void {
      event.preventDefault();
      if (!user) {
         alert("You should to login!");
         return;
      }

      if (!commentText.trim()) return;

      addComment(todoId, user, commentText.trim());
      setCommentText("");
      setComments(getComments(todoId));
   }

   if (isLoading) return <p className="loading">Loading info.....</p>;
   if (error) return <p className="error">error loading...</p>;

   if (!data) return null;
   return (
      <div className={`todo-details ${data.completed ? "done" : "not"}`}>
         <h2>Todo {data.id}</h2>
         <p className="todo-text">{data.todo}</p>
         <p className={data.completed ? "status done" : "status not done"}>
            {data.completed ? "completed" : "not completed"}
         </p>

         <div className="comments">
            <h3 className="comments-title">Comments</h3>
            {comments.length === 0 && (
               <p className="comments-info">No comments info</p>
            )}

            {comments.map((comment: Comment) => (
               <div key={comment.id} className="comments__item">
                  <div className="comments__item-header">
                     <span className="comments__item-author">
                        {comment.author}
                     </span>
                     <span className="comments__item-date">
                        {new Date(comment.createdAt).toLocaleString()}
                     </span>
                  </div>
                  <div className="comments__item-text">{comment.text}</div>
               </div>
            ))}

            {user ? (
               <form onSubmit={handleAddComment} className="comments__form">
                  <input
                     className="comments__input"
                     placeholder="Add a comment..."
                     value={commentText}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCommentText(event.target.value)
                     }
                  />
                  <button type="submit" className="comments__button">
                     Post
                  </button>
               </form>
            ) : (
               <p className="comments__login-info">Log in to add comments.</p>
            )}
         </div>
      </div>
   );
}
