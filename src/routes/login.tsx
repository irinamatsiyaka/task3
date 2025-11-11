import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { signIn } from "../lib/auth";
import { ROUTES } from "../constants/routes";
import "./auth.css";

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
         window.location.reload();
      } catch (event) {
         setErr(event?.message || "failed to sign in");
      } finally {
         setPending(false);
      }
   }

   return (
      <div className="auth-page">
         <div className="auth-card">
            <h2 className="auth-title">Login</h2>

            <form onSubmit={handleSubmit} className="auth-form">
               <input
                  placeholder="Username"
                  className="auth-input"
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setUsername(event.target.value)
                  }
               />
               <input
                  placeholder="Password"
                  type="password"
                  className="auth-input"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setPassword(event.target.value)
                  }
               />

               {error && <div className="auth-error">{error}</div>}

               <button type="submit" disabled={pending} className="auth-button">
                  {pending ? "Please wait..." : "Login"}
               </button>
            </form>

            <p className="auth-footer">
               No account? <Link to={ROUTES.REGISTER}>Register</Link>
            </p>
         </div>
      </div>
   );
}
