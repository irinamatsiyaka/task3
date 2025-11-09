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
      <div className="max-w-3xl mx-auto mt-8 px-4">
         <h2 className="text-3xl font-bold mb-6 text-center">Todo list</h2>

         <ul className="space-y-3">
            {data?.todos?.map((todo: Todo) => (
               <li key={todo.id}>
                  <Link
                     to="/todo/$todoId"
                     params={{ todoId: String(todo.id) }}
                     className={`flex flex-col gap-1 rounded-xl border px-4 py-3 transition hover:bg-gray-50 ${
                        todo.completed
                           ? "border-green-400 bg-green-50"
                           : "border-gray-200 bg-white"
                     }`}
                  >
                     <h3 className="text-lg font-medium text-gray-900">
                        {todo.todo}
                     </h3>
                     <p
                        className={`text-sm ${
                           todo.completed ? "text-green-700" : "text-gray-600"
                        }`}
                     >
                        {todo.completed ? "Completed" : "Not completed"}
                     </p>
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}
