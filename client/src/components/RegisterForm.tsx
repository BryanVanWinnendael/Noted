import { useState } from "react";
import { registerSchema } from "@lib/schemas";
import { ErrorPlaceholder } from "@components/ErrorPlaceholder";
import { Error } from "@components/Error";

const postFormData = async (formData: any) => {
  const res = await fetch("/api/auth/register.json", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    return data;
  }

  if (res.redirected) {
    window.location.assign(res.url);
  }
};

const SignupForm = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [clientErrors, setClientErrors] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault();
    setClientErrors(null);
    const data = new FormData(e.currentTarget);
    const result = registerSchema.safeParse(Object.fromEntries(data.entries()));

    if (!result.success) {
      const errors = result.error.flatten();
      setClientErrors(errors);
      return;
    }

    setLoading(true);
    const res = await postFormData(data);
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
          className="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-[#6488ea] focus:outline-none focus:ring-2 focus:ring-[#6488ea] focus:bg-zinc-900 focus:ring-opacity-60"
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
          className="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-[#6488ea] focus:outline-none focus:ring-2 focus:ring-[#6488ea] focus:bg-zinc-900 focus:ring-opacity-60"
        />
        {clientErrors?.fieldErrors?.password ? (
          <Error message={clientErrors.fieldErrors.password} />
        ) : (
          <ErrorPlaceholder />
        )}
      </div>
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="confirmPassword"
          className="font-medium text-zinc-300 text-sm"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-[#6488ea] focus:outline-none focus:ring-2 focus:ring-[#6488ea] focus:bg-zinc-900 focus:ring-opacity-60"
        />
        {clientErrors?.fieldErrors?.confirmPassword ? (
          <Error message={clientErrors.fieldErrors.confirmPassword} />
        ) : (
          <ErrorPlaceholder />
        )}
      </div>
      <button
        className="bg-zinc-100 py-1.5 border border-zinc-100 rounded-md mt-2 text-black font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6488ea] focus:ring-offset-zinc-900"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
      {response && (
        <>
          {response.error && <Error message={response.error} />}
          {response.error === "auth/email-already-exists" && (
            <Error message="The email address is already in use by another account" />
          )}
        </>
      )}
    </form>
  );
};

export default SignupForm;
