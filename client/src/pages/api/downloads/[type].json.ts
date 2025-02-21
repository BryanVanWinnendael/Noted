import { fetcher } from "@lib/utils";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, redirect }) => {
  const type = params.type;

  try {
    fetcher(`downloads/${type}`, "GET", "");
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
