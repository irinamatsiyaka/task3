import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
   component: () => {
      return <h2>Home page</h2>;
   },
});
