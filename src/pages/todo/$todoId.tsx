import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import type { Todo } from "../../types/todo";
import { getCurrentUser } from "../../lib/auth";
import type { FormEvent } from "react";

import {
   connectToChat,
   getChatHistory,
   sendChatMessage,
} from "../../lib/websocket";
import type { ChatMessage } from "../../types/message";

export const Route = createFileRoute("/todo/$todoId")({
   component: TodoDetails,
});

function TodoDetails(): React.JSX.Element | null {
   const { todoId } = Route.useParams();
   const queryClient = useQueryClient();
   const { data, isLoading, error } = useQuery<Todo>({
      queryKey: ["todo", todoId],
      queryFn: async () => {
         const res = await fetch(`https://dummyjson.com/todos/${todoId}`);
         if (!res.ok) throw new Error("failed to load");
         return res.json();
      },
   });

   const currentUser = getCurrentUser();
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [messageText, setMessageText] = useState("");

   useEffect(() => {
      setMessages(getChatHistory(todoId));

      const unsubscribe = connectToChat((message: ChatMessage) => {
         if (message.todoId === todoId) {
            setMessages((prev: ChatMessage[]) => [...prev, message]);
         }
      });

      return unsubscribe;
   }, [todoId]);

   const toggleMutation = useMutation({
      mutationFn: async (newCompleted: boolean) => {
         const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: newCompleted }),
         });
         if (!res.ok) throw new Error("failed to update status");
         return res.json();
      },
      onSuccess: (updatedTodo: Todo) => {
         queryClient.setQueryData(["todo", todoId], updatedTodo);
      },
   });

   const handleToggle = (): void => {
      toggleMutation.mutate(!data?.completed);
   };

   const handleSendMessage = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (!currentUser) {
         alert("u should login");
         return;
      }

      if (!messageText.trim()) {
         return;
      }

      sendChatMessage(
         todoId,
         currentUser.name ?? currentUser.username,
         messageText.trim()
      );
      setMessageText("");
   };

   if (isLoading) return <p className="text-sm">Loading info.....</p>;
   if (error) return <p className="text-sm">error loading...</p>;

   if (!data) return null;
   return (
      <div
         className={`max-w-2xl mx-auto mt-8 rounded-2xl p-6 text-center shadow-md border ${
            data.completed
               ? "bg-green-50 border-green-300"
               : "bg-red-50 border-red-300"
         }`}
      >
         <h2 className="text-4xl font-bold mb-4">Todo {data.id}</h2>

         <p className="text-lg text-gray-800 mb-3">{data.todo}</p>

         <div className="flex flex-col items-center gap-4 my-4">
            <p
               className={`text-lg font-medium ${
                  data.completed ? "text-green-600" : "text-red-600"
               }`}
            >
               {data.completed ? "Completed" : "Not completed"}
            </p>

            <button
               className="bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors hover:bg-purple-800 disabled:opacity-60 disabled:cursor-not-allowed"
               onClick={handleToggle}
               disabled={toggleMutation.isPending}
            >
               {data.completed ? "Mark as Not Completed" : "Mark as Completed"}
            </button>
         </div>

         <div className="mt-8 border-t border-gray-200 pt-4 text-left">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
               Comments
            </h3>

            {messages.length === 0 && (
               <p className="text-gray-500 text-sm mb-3">No comments info</p>
            )}

            {messages.map((comment: ChatMessage) => (
               <div
                  key={comment.id}
                  className="border border-gray-200 bg-gray-50 rounded-xl p-3 mb-3 shadow-sm"
               >
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-sm font-semibold text-gray-800">
                        {comment.author}
                     </span>
                     <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                     </span>
                  </div>
                  <div className="text-gray-700 text-sm mt-1 leading-snug">
                     {comment.text}
                  </div>
               </div>
            ))}

            {currentUser ? (
               <form
                  onSubmit={handleSendMessage}
                  className="mt-4 flex gap-2 items-center"
               >
                  <input
                     className="flex-grow border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                     placeholder="Add a comment..."
                     value={messageText}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setMessageText(event.target.value)
                     }
                  />
                  <button
                     type="submit"
                     className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
                  >
                     Post
                  </button>
               </form>
            ) : (
               <p className="text-gray-400 text-sm mt-2">
                  Log in to add comments.
               </p>
            )}
         </div>
      </div>
   );
}
