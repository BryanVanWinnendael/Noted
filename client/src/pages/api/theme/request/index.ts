import { themeFormSchema } from "@lib/schemas";
import { fetcher, getUser } from "@lib/utils";
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

  const formData = await request.formData();
  const result = themeFormSchema.safeParse(formData);
  const user = await getUser(cookie);

  // const user = await auth.getUser(cookie)

  /* Validate the data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 },
    );
  }

  const {
    name,
    backgroundColor,
    secondaryBackgroundColor,
    textColor,
    iconColor,
    accentColor,
  } = result.data;

  try {
    const body = {
      email: user?.email,
      name,
      backgroundColor,
      secondaryBackgroundColor,
      textColor,
      iconColor,
      accentColor,
    };
    const res = await fetcher("themes/requests", "POST", cookie, body);
    if (res.error) {
      return new Response(
        JSON.stringify({
          error: res.error,
        }),
        { status: 400 },
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.code,
      }),
      { status: 400 },
    );
  }
  return redirect("/themes", 302);
};
