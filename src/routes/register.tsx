import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { createUser } from "../lib/auth";
import { ROUTES } from "../constants/routes";
import type { CountriesResponse, Country } from "../types/country";
import { useQuery } from "@tanstack/react-query";
import { graphqlRequest } from "../lib/graphClient";

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
   const [country, setCountry] = useState("");
   const [countryName, countryEmoji] = country.split("|");

   const { data, isLoading, error } = useQuery({
      queryKey: ["countries"],
      queryFn: () =>
         graphqlRequest<CountriesResponse>(`
            query{
               countries{
                  code
                  name
                  emoji
                  }
               }`),
   });

   function handleSubmit(event: React.FormEvent): void {
      event.preventDefault();
      setErr(null);
      if (!username.trim() || !password.trim() || !country) {
         setErr("please fill in all required fields");
         return;
      }
      try {
         setPending(true);
         createUser(
            username.trim(),
            password,
            name.trim() || undefined,
            country,
            countryEmoji
         );
         nav({ to: ROUTES.LOGIN });
      } catch (error) {
         if (event instanceof Error) {
            setErr(event.message);
         } else {
            setErr("failed to register");
         }
      } finally {
         setPending(false);
      }
   }

   return (
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
         <div className="bg-white shadow-lg rounded-2xl p-8 w-80 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
               Register
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
               <input
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Username *"
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setUsername(event.target.value)
                  }
               />
               <input
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Display name (optional)"
                  value={name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setName(event.target.value)
                  }
               />
               <input
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Password *"
                  type="password"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     setPassword(event.target.value)
                  }
               />

               {isLoading ? (
                  <p className="text-sm">Loading countries...</p>
               ) : error ? (
                  <p className=" text-sm">Failed to load countries...</p>
               ) : (
                  <select
                     className="w-full text-sm"
                     value={country}
                     onChange={(event) => setCountry(event.target.value)}
                  >
                     <option value="">Select your country:</option>
                     {data?.countries.map((land: Country) => (
                        <option
                           value={`${land.name}|${land.emoji}`}
                           key={land.name}
                        >
                           {land.emoji}
                           {land.name}
                        </option>
                     ))}
                  </select>
               )}

               {err && <div className="text-red-600 text-sm">{err}</div>}

               <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl disabled:opacity-50 hover:bg-blue-700 transition"
               >
                  {pending ? "Please wait..." : "Register"}
               </button>
            </form>

            <p className="text-sm text-gray-500 mt-3">
               Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
            </p>
         </div>
      </div>
   );
}
