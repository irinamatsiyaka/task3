import React from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

export default function App(): React.JSX.Element {
   return <RouterProvider router={router}></RouterProvider>;
}
