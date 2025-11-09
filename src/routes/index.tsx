import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
   component: HomePage,
});

function HomePage(): React.JSX.Element {
   return (
      <section className="flex items-center justify-center min-h-[80vh] bg-gray-100">
         <div className="text-center max-w-2xl p-8 bg-white rounded-2xl shadow-md">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
               Welcome to Todo App
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
               Your personal space to organize daily tasks, track progress, and
               leave comments.
            </p>

            <Link
               to="/todo"
               className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
               Go to Todos
            </Link>
         </div>
      </section>
   );
}
