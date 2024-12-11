import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  console.log(request.headers.get("User-Agent"));
  let os;
  const userAgent = request.headers.get("User-Agent");
  if (userAgent?.includes("Win")) {
    os = "windows";
  } else if (userAgent?.includes("Mac")) {
    os = "macos";
  } else {
    os = "linux";
  }

  return new Response(
    JSON.stringify({
      os,
    }),
    { status: 200 },
  );
};
