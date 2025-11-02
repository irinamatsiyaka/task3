import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { createUser } from "../lib/auth";
import { ROUTES } from "../constants/routes";
import "./auth.css";

export const Route = createFileRoute("/register")({
   component: RegisterPage,
});
function RegisterPage(): React.JSX.Element {
   const nav = useNavigate();
   const [username, setUsername] = useState("");
   const [name, setName] = useState("");
   const [password, setPassword] = useState("");
   const [err, setErr] = useState<string | null>(null);
   const [pending, setPending] = useState(false);

   function handleSubmit(event: React.FormEvent): void {
      event.preventDefault();
      setErr(null);
      if (!username.trim() || !password.trim()) {
         setErr("please fill in all required fields");
         return;
      }
      try {
         setPending(true);
         createUser(username.trim(), password, name.trim() || undefined);
         nav({ to: ROUTES.HOME });
         window.location.reload();
      } catch (error) {
         setErr(error?.message || "failed to register");
      } finally {
         setPending(false);
      }
   }

   return (
      <div className="auth-page">
         <div className="auth-card">
            <h2 className="auth-title">Register</h2>

            <form onSubmit={handleSubmit} className="auth-form">
               <input
                  className="auth-input"
                  placeholder="Username *"
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setUsername(event.target.value)
                  }
               />
               <input
                  className="auth-input"
                  placeholder="Display name (optional)"
                  value={name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setName(event.target.value)
                  }
               />
               <input
                  className="auth-input"
                  placeholder="Password *"
                  type="password"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setPassword(event.target.value)
                  }
               />

               {err && <div className="auth-error">{err}</div>}

               <button type="submit" disabled={pending} className="auth-button">
                  {pending ? "Please wait..." : "Register"}
               </button>
            </form>

            <p className="auth-footer">
               Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
            </p>
         </div>
      </div>
   );
}
