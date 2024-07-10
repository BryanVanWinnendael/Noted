import { useState } from "react";
import {
  signInWithEmailAndPassword,
  inMemoryPersistence,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { loginSchema } from "@lib/schemas";
import { app } from "@lib/firebase/client";
import { ErrorPlaceholder } from "@components/ErrorPlaceholder";
import { Error } from "@components/Error";

const auth = getAuth(app);

/* This will set the persistence to session */
auth.setPersistence(inMemoryPersistence);

const postFormData = async (formData: any) => {
  const { email, password } = formData;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const idToken = await userCredential.user.getIdToken();
    const res = await fetch("/api/auth/login.json", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      return data;
    }

    if (res.redirected) {
      window.location.assign(res.url);
    }
  } catch (e) {
    return { error: "Invalid email/password" };
  }
};

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const idToken = await userCredential.user.getIdToken();
  const res = await fetch("/api/auth/login.json", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    return data;
  }

  if (res.redirected) {
    window.location.assign(res.url);
  }
};

const LoginForm = () => {
  const [formData, setFormData] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [clientErrors, setClientErrors] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault();
    setClientErrors(null);
    const data = new FormData(e.currentTarget);
    const result = loginSchema.safeParse(Object.fromEntries(data.entries()));

    if (!result.success) {
      const errors = result.error.flatten();
      setClientErrors(errors);
      return;
    }
    setLoading(true);
    const res = await postFormData(result.data);
    setResponse(res);
    setLoading(false);
  };

  return (
    <form className="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="email" className="font-medium text-zinc-300 text-sm">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-[#6488ea] focus:outline-none focus:ring-2 focus:ring-[#6488ea] focus:ring-opacity-60 focus:bg-zinc-900"
        />
        {clientErrors?.fieldErrors?.email ? (
          <Error message={clientErrors.fieldErrors.email} />
        ) : (
          <ErrorPlaceholder />
        )}
      </div>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="password" className="font-medium text-zinc-300 text-sm">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-[#6488ea] focus:outline-none focus:ring-2 focus:ring-[#6488ea] focus:ring-opacity-60 focus:bg-zinc-900"
        />
        {clientErrors?.fieldErrors?.password ? (
          <Error message={clientErrors.fieldErrors.password} />
        ) : (
          <ErrorPlaceholder />
        )}
      </div>
      <button
        className="bg-zinc-100 py-1.5 border border-zinc-100 rounded-md mt-2 text-zinc-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6488ea] disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <div>
        <hr className="h-0 border-t mt-4 border-zinc-300" />
        <p className="-mt-2.5 text-xs text-center text-zinc-500">
          <span className="bg-zinc-900 px-4">Or with</span>
        </p>
      </div>
      <div className="grid grid-cols-1">
        <button
          onClick={googleSignIn}
          className="bg-zinc-100 p-1.5 border border-zinc-100 flex justify-center items-center gap-2 rounded-md mt-2 text-zinc-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-auto"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            />
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
      {response && (
        <>
          {response.error && <Error message={response.error} />}
          {response.error?.code === "auth/wrong-password" && (
            <Error message="Your password is incorrect" />
          )}
          {response.error?.code === "auth/user-not-found" && (
            <Error message="You don't have an account with this email" />
          )}
        </>
      )}
    </form>
  );
};

export default LoginForm;
