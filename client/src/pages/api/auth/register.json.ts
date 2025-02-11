import { auth } from "@lib/firebase/server";
import { registerSchema } from "@lib/schemas";
import type { APIRoute } from "astro";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "@lib/firebase/client";

const authLogin = getAuth(app);

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const result = registerSchema.safeParse(formData);

  /* Validate the data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 },
    );
  }

  /* Create the user */
  const { email, password } = result.data;
  let sessionCookie;
  try {
    await auth.createUser({
      email,
      password,
    });

    const userCredential = await signInWithEmailAndPassword(
      authLogin,
      email,
      password,
    );
    const idToken = await userCredential.user.getIdToken();

    const fiveDays = 60 * 60 * 24 * 5 * 1000;
    sessionCookie = await auth
      .createSessionCookie(idToken, { expiresIn: fiveDays })
      .catch((error) => {
        return new Response(
          JSON.stringify({
            message: error.message,
          }),
          { status: 401 },
        );
      });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.code,
      }),
      { status: 400 },
    );
  }

  cookies.set("session", sessionCookie, {
    path: "/",
  });

  return redirect("/themes", 302);
};
