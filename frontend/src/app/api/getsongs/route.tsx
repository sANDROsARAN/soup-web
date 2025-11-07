import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetch(
    "https://soupweb-backend.azurewebsites.net/api/getsongs"
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" // ensures CORS works
    },
  });
}
