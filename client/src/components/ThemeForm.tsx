import {
  createSignal,
  Show,
  createResource,
  Suspense,
  Switch,
  Match,
} from "solid-js"
import type { z } from "zod"
import { themeFormSchema } from "@lib/schemas"
import { ErrorPlaceholder } from "@components/ErrorPlaceholder"
import { Error } from "@components/Error"

type Errors = z.typeToFlattenedError<
  z.inferFormattedError<typeof themeFormSchema>
>

const postFormData = async (formData: FormData) => {
  const res = await fetch("/api/theme/request", {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const data = await res.json()
    return data
  }

  if (res.redirected) {
    window.location.assign(res.url)
  }
}

const ThemeForm = () => {
  const [formData, setFormData] = createSignal<FormData>()
  const [response] = createResource(formData, postFormData)
  const [clientErrors, setClientErrors] = createSignal<Errors>()

  const submit = async (e: SubmitEvent) => {
    e.preventDefault()
    setClientErrors()
    const data = new FormData(e.currentTarget as HTMLFormElement)
    const result = themeFormSchema.safeParse(data)

    if (!result.success) {
      const errors = result.error.flatten() as Errors
      setClientErrors(errors)
      return
    }
    setFormData(data)
  }

  return (
    <form class="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
      <div class="grid grid-cols-1 gap-2">
        <label for="name" class="font-medium text-zinc-300 text-sm">
          Theme name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          class="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-[#6488ea] focus:outline-none focus:ring-2 focus:ring-[#6488ea]  focus:bg-zinc-900 focus:ring-opacity-60"
        />
        <Show
          when={clientErrors()?.fieldErrors.name}
          fallback={<ErrorPlaceholder />}
        >
          <Error message={clientErrors()?.fieldErrors.name} />
        </Show>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="grid grid-cols-1 gap-2">
          <label
            for="backgroundColor"
            class="font-medium text-zinc-300 text-sm"
          >
            Background color
          </label>
          <input
            name="backgroundColor"
            type="color"
            id="backgroundColor"
            value="#1B1B1D"
            class="color-picker w-12 h-12"
          />
          <Show
            when={clientErrors()?.fieldErrors.backgroundColor}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.backgroundColor} />
          </Show>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <label
            for="secondaryBackgroundColor"
            class="font-medium text-zinc-300 text-sm"
          >
            Secondary background color
          </label>
          <input
            name="secondaryBackgroundColor"
            type="color"
            id="secondaryBackgroundColor"
            value="#2C2C2E"
            class="color-picker w-12 h-12"
          />
          <Show
            when={clientErrors()?.fieldErrors.secondaryBackgroundColor}
            fallback={<ErrorPlaceholder />}
          >
            <Error
              message={clientErrors()?.fieldErrors.secondaryBackgroundColor}
            />
          </Show>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <label for="textColor" class="font-medium text-zinc-300 text-sm">
            Text color
          </label>
          <input
            name="textColor"
            type="color"
            id="textColor"
            value="#ffffff"
            class="color-picker w-12 h-12"
          />
          <Show
            when={clientErrors()?.fieldErrors.textColor}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.textColor} />
          </Show>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <label for="iconColor" class="font-medium text-zinc-300 text-sm">
            Icon color
          </label>
          <input
            name="iconColor"
            type="color"
            id="iconColor"
            value="#ffffff"
            class="color-picker w-12 h-12"
          />
          <Show
            when={clientErrors()?.fieldErrors.iconColor}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.iconColor} />
          </Show>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <label for="accentColor" class="font-medium text-zinc-300 text-sm">
            Accent color
          </label>
          <input
            name="accentColor"
            type="color"
            id="accentColor"
            value="#6488ea"
            class="color-picker w-12 h-12 border-1 border-[#6488ea]"
          />
          <Show
            when={clientErrors()?.fieldErrors.accentColor}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.accentColor} />
          </Show>
        </div>
      </div>
      <button
        class="bg-zinc-100 py-1.5 border border-zinc-100 rounded-md mt-2 text-black font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 focus:ring-offset-zinc-900"
        type="submit"
        disabled={response.loading}
      >
        <Show fallback="Request theme" when={response.loading}>
          Uploading request...
        </Show>
      </button>
      <Suspense>
        <Switch>
          <Match when={response()?.error === "auth/email-already-exists"}>
            <Error message="The email address is already in use by another account" />
          </Match>
          <Match when={response()?.error}>
            <Error message={response().error} />
          </Match>
        </Switch>
      </Suspense>
    </form>
  )
}

export default ThemeForm
