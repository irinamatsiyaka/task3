import { useState, useEffect } from "react";
import {
   createRootRoute,
   Link,
   Outlet,
   useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { getCurrentUser, signOut } from "../lib/auth";
import { ROUTES } from "../constants/routes";

export const Route = createRootRoute({
   component: () => {
      const navigate = useNavigate();
      const [user, setUser] = useState(getCurrentUser());

      useEffect(() => {
         const handleStorageChange = (): void => setUser(getCurrentUser());
         window.addEventListener("storage", handleStorageChange);
         return (): void =>
            window.removeEventListener("storage", handleStorageChange);
      }, []);

      const handleLogout = (): void => {
         signOut();
         setUser(null);
         navigate({ to: ROUTES.HOME });
      };

      return (
         <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <h1 className="text-4xl font-extrabold text-center pt-6 mb-4 tracking-tight">
               Todo App
            </h1>

            <nav className="relative flex items-center py-4 bg-white shadow-md rounded-b-2xl sticky top-0 z-50 w-full">
               {user?.countryEmoji && (
                  <div className="pl-6 text-3xl" title={user.country}>
                     {user.countryEmoji}
                  </div>
               )}

               <div className="absolute left-1/2 -translate-x-1/2 flex gap-10">
                  <Link
                     to={ROUTES.HOME}
                     className="text-gray-700 font-medium hover:text-gray-400 hover:underline underline-offset-4"
                  >
                     Home
                  </Link>
                  <Link
                     to={ROUTES.ABOUT}
                     className="text-gray-700 font-medium hover:text-gray-400 hover:underline underline-offset-4"
                  >
                     About
                  </Link>
                  <Link
                     to={ROUTES.TODO}
                     className="text-gray-700 font-medium hover:text-gray-400 hover:underline underline-offset-4"
                  >
                     Todo
                  </Link>
               </div>

               <div className="ml-auto flex items-center gap-4 pr-4">
                  {!user && (
                     <>
                        <Link
                           to={ROUTES.LOGIN}
                           className="text-gray-700 font-medium hover:text-gray-400 hover:underline underline-offset-4 text-sm"
                        >
                           Login
                        </Link>
                        <Link
                           to={ROUTES.REGISTER}
                           className="text-gray-700 font-medium hover:text-gray-400 hover:underline underline-offset-4 text-sm"
                        >
                           Register
                        </Link>
                     </>
                  )}

                  {user && (
                     <>
                        <button
                           onClick={handleLogout}
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
