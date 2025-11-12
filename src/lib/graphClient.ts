export async function graphqlRequest<T>(
   query: string,
   variables?: Record<string, unknown>
): Promise<T> {
   const response = await fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
   });

   if (!response.ok) throw new Error("GraphQL request failed");

   const json = await response.json();

   if (json.errors?.length) throw new Error(json.errors[0].message);
   return json.data;
}
