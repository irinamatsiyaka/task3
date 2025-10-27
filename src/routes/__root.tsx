import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
   component: () => {
      return (
         <div>
            <h1>Todo App</h1>
            <nav>
               <a href="/">Home</a>
               <a href="/about">About</a>
               <a href="/todo">Todo</a>
            </nav>
            <Outlet />
            <TanStackRouterDevtools
               initialIsOpen={false}
            ></TanStackRouterDevtools>
         </div>
      );
   },
});
