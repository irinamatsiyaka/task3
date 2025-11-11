import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { signIn } from "../lib/auth";
import { ROUTES } from "../constants/routes";

export const Route = createFileRoute("/login")({
   component: LoginPage,
});

function LoginPage(): React.JSX.Element {
   const nav = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setErr] = useState<string | null>(null);
   const [pending, setPending] = useState(false);

   function handleSubmit(event: React.FormEvent): void {
      event.preventDefault();
      setErr(null);
      if (!username.trim() || !password.trim()) {
         setErr("Please fill in all fields");
         return;
      }
      try {
         setPending(true);
         signIn(username.trim(), password);
         nav({ to: ROUTES.HOME });
         window.dispatchEvent(new Event("storage"));
      } catch (event) {
         if (event instanceof Error) {
            setErr(event.message);
         } else {
            setErr("failed to sign in");
         }
      } finally {
         setPending(false);
      }
   }

   return (
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
         <div className="bg-white shadow-lg rounded-2xl p-8 w-80 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
               <input
                  placeholder="Username"
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setUsername(event.target.value)
                  }
               />
               <input
                  placeholder="Password"
                  type="password"
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setPassword(event.target.value)
                  }
               />

               {error && <div className="text-red-600 text-sm">{error}</div>}

               <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl disabled:opacity-50 hover:bg-blue-700 transition"
               >
                  {pending ? "Please wait..." : "Login"}
               </button>
            </form>

            <p className="text-sm text-gray-500 mt-3">
               No account? <Link to={ROUTES.REGISTER}>Register</Link>
            </p>
         </div>
      </div>
   );
}
