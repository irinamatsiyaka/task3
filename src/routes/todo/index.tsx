import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { Todo } from "../../types/todo";
import { Link } from "@tanstack/react-router";
import type React from "react";

export const Route = createFileRoute("/todo/")({
   component: TodoList,
});

function TodoList(): React.JSX.Element {
   const { data, isLoading, error } = useQuery<{ todos: Todo[] }>({
      queryKey: ["todos"],
      queryFn: async () => {
         const res = await fetch("https://dummyjson.com/todos?limit=20");
         if (!res.ok) throw new Error("failed to load todos");
         return res.json();
      },
   });

   if (isLoading) return <p>Loading.....</p>;
   if (error) return <p>error loading</p>;

   return (
      <div className="todo-container">
         <h2 className="todo-title">TodoList</h2>
         <ul className="todo-list">
            {data?.todos?.map((todo: Todo) => (
               <Link
                  key={todo.id}
                  to="/todo/$todoId"
                  params={{ todoId: String(todo.id) }}
                  className={`todo-item ${todo.completed ? "completed" : ""}`}
               >
                  <h3 className="todoInfo">{todo.todo}</h3>
                  <p>{todo.completed ? "Completed" : "Not completed"}</p>
               </Link>
            ))}
         </ul>
      </div>
   );
}
