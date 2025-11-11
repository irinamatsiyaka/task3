import { createFileRoute } from "@tanstack/react-router";
import type React from "react";

export const Route = createFileRoute("/about")({
   component: AboutPage,
});

function AboutPage(): React.JSX.Element {
   return (
      <section className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
         <h2 className="text-2xl font-semibold mb-3">About the Todo App</h2>

         <p className="text-gray-600 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
            labore animi blanditiis officiis nihil necessitatibus, repellat
            dolorum sunt praesentium, quas reprehenderit itaque eaque aliquid?
            Magni, mollitia nulla dignissimos excepturi dolor magnam corrupti
            tenetur a illo voluptas similique voluptatum maxime totam temporibus
            sequi ea quibusdam possimus aliquam facere.
         </p>

         <p className="text-gray-600 leading-relaxed mb-4">
            Repellat minima dolor autem veritatis aspernatur blanditiis aliquam
            eius illo! Quidem dolor facilis vitae incidunt cumque quis explicabo
            libero, eaque magnam adipisci deserunt soluta suscipit harum illo,
            ad nobis quas culpa nemo.
         </p>

         <p className="text-gray-600 leading-relaxed mb-4">
            Expedita laborum non tenetur? Fugit maxime dolor eum adipisci saepe
            quod sed quaerat placeat magni facere. Qui vel, magni dicta quod
            delectus aliquid quaerat explicabo.
         </p>
      </section>
   );
}
