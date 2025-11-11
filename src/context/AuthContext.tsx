import { createFileRoute } from "@tanstack/react-router";
import type React from "react";

export const Route = createFileRoute("/context/AuthContext")({
   component: AuthContext,
});

function AuthContext(): React.JSX.Element {
   return <div>Hello</div>;
}
