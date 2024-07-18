import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const os = request.headers.get("User-Agent")?.includes("Win")
    ? "windows"
    : "linux";
  return new Response(
    JSON.stringify({
      os,
    }),
    { status: 200 },
  );
};
