import { fetcher } from "@lib/utils";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const cookie = cookies.get("session")?.value;
  if (!cookie) {
    return new Response(
      JSON.stringify({
        error: "No token found",
      }),
      { status: 401 },
    );
  }

  const body = await request.json();

  try {
    fetcher("themes", "POST", cookie, body);
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.code,
      }),
      { status: 400 },
    );
  }
  return redirect("/", 302);
};
