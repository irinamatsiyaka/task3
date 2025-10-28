import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import type { Todo } from "../../types/todo";

export const Route = createFileRoute("/todo/$todoId")({
   component: TodoDetails,
});

function TodoDetails(): React.JSX.Element {
   const { todoId } = Route.useParams();
   const { data, isLoading, error } = useQuery<Todo>({
      queryKey: ["todo", todoId],
      queryFn: async () => {
         const res = await fetch(`https://dummyjson.com/todos/${todoId}`);
         if (!res.ok) throw new Error("faild to load");
         return res.json();
      },
   });

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
      </div>
   );
}
