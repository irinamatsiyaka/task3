import React from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { getCurrentUser, signOut } from "../lib/auth";
import { ROUTES } from "../constants/routes";

export const Route = createRootRoute({
   component: () => {
      const user = getCurrentUser();

      return (
         <div>
            <h1>Todo App</h1>

            <nav>
               <div className="nav-center-abs">
                  <Link to={ROUTES.HOME}>Home</Link>
                  <Link to={ROUTES.ABOUT}>About</Link>
                  <Link to={ROUTES.TODO}>Todo</Link>
               </div>

               <div className="nav-right">
                  {!user && (
                     <>
                        <Link to={ROUTES.LOGIN}>Login</Link>
                        <Link to={ROUTES.REGISTER}>Register</Link>
                     </>
                  )}
                  {user && (
                     <>
                        <span className="text-sm opacity-80">{user.email}</span>
                        <button
                           onClick={() => signOut()}
                           className="rounded-2xl border px-3 py-1"
                        >
                           Logout
                        </button>
                     </>
                  )}
               </div>
            </nav>

            <Outlet />
            <TanStackRouterDevtools initialIsOpen={false} />
         </div>
      );
   },
});
