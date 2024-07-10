import { useState } from "react";
import { themeFormSchema } from "@lib/schemas";
import { ErrorPlaceholder } from "@components/ErrorPlaceholder";
import { Error } from "@components/Error";

const postFormData = async (formData: any) => {
  const res = await fetch("/api/theme/request", {
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

const ThemeForm = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [clientErrors, setClientErrors] = useState<any>(null);

  const submit = async (e: any) => {
    e.preventDefault();
    setClientErrors(null);
    const data = new FormData(e.currentTarget);
    const result = themeFormSchema.safeParse(
      Object.fromEntries(data.entries()),
    );

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
        <label htmlFor="name" className="font-medium text-zinc-300 text-sm">
          Theme name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-[#6488ea] focus:outline-none focus:ring-2 focus:ring-[#6488ea] focus:bg-zinc-900 focus:ring-opacity-60"
        />
        {clientErrors?.fieldErrors?.name ? (
          <Error message={clientErrors.fieldErrors.name} />
        ) : (
          <ErrorPlaceholder />
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="backgroundColor"
            className="font-medium text-zinc-300 text-sm"
          >
            Background color
          </label>
          <input
            name="backgroundColor"
            type="color"
            id="backgroundColor"
            defaultValue="#1B1B1D"
            className="color-picker w-12 h-12"
          />
          {clientErrors?.fieldErrors?.backgroundColor ? (
            <Error message={clientErrors.fieldErrors.backgroundColor} />
          ) : (
            <ErrorPlaceholder />
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="secondaryBackgroundColor"
            className="font-medium text-zinc-300 text-sm"
          >
            Secondary background color
          </label>
          <input
            name="secondaryBackgroundColor"
            type="color"
            id="secondaryBackgroundColor"
            defaultValue="#2C2C2E"
            className="color-picker w-12 h-12"
          />
          {clientErrors?.fieldErrors?.secondaryBackgroundColor ? (
            <Error
              message={clientErrors.fieldErrors.secondaryBackgroundColor}
            />
          ) : (
            <ErrorPlaceholder />
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="textColor"
            className="font-medium text-zinc-300 text-sm"
          >
            Text color
          </label>
          <input
            name="textColor"
            type="color"
            id="textColor"
            defaultValue="#ffffff"
            className="color-picker w-12 h-12"
          />
          {clientErrors?.fieldErrors?.textColor ? (
            <Error message={clientErrors.fieldErrors.textColor} />
          ) : (
            <ErrorPlaceholder />
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="iconColor"
            className="font-medium text-zinc-300 text-sm"
          >
            Icon color
          </label>
          <input
            name="iconColor"
            type="color"
            id="iconColor"
            defaultValue="#ffffff"
            className="color-picker w-12 h-12"
          />
          {clientErrors?.fieldErrors?.iconColor ? (
            <Error message={clientErrors.fieldErrors.iconColor} />
          ) : (
            <ErrorPlaceholder />
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label
            htmlFor="accentColor"
            className="font-medium text-zinc-300 text-sm"
          >
            Accent color
          </label>
          <input
            name="accentColor"
            type="color"
            id="accentColor"
            defaultValue="#6488ea"
            className="color-picker w-12 h-12 border-1 border-[#6488ea]"
          />
          {clientErrors?.fieldErrors?.accentColor ? (
            <Error message={clientErrors.fieldErrors.accentColor} />
          ) : (
            <ErrorPlaceholder />
          )}
        </div>
      </div>
      <button
        className="bg-zinc-100 py-1.5 border border-zinc-100 rounded-md mt-2 text-black font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 focus:ring-offset-zinc-900"
        type="submit"
        disabled={loading}
      >
        {loading ? "Uploading request..." : "Request theme"}
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

export default ThemeForm;
