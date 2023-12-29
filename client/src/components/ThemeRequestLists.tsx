import type { ThemeType } from "@lib/types"
import { For, createSignal } from "solid-js"
import ThemeCard from "./ThemeCard"

const ThemeRequestList = ({
  themes,
}: {
  themes: { [key: string]: ThemeType }
}) => {
  const [resThemes, setResThemes] = createSignal<{
    [key: string]: ThemeType
  }>(themes)

  const handleApprove = async (name: string, theme: ThemeType) => {
    const themeBody = {
      name: name,
      backgroundColor: theme.backgroundColor,
      secondaryBackgroundColor: theme.secondaryBackgroundColor,
      textColor: theme.textColor,
      iconColor: theme.iconColor,
      accentColor: theme.accentColor,
    }

    await fetch("/api/theme/request/add.json", {
      method: "POST",
      body: JSON.stringify(themeBody),
    })

    const newThemes = { ...resThemes() }
    delete newThemes[name]
    setResThemes(newThemes)
  }

  const handleReject = async (name: string) => {
    await fetch("/api/theme/request/delete.json", {
      method: "POST",
      body: JSON.stringify(name),
    })

    const newThemes = { ...resThemes() }
    delete newThemes[name]
    setResThemes(newThemes)
  }

  return (
    <div class="w-full">
      <For each={resThemes() && Object.keys(resThemes())}>
        {(theme) => (
          <div class="bg-[#28282b] p-2 mb-5 rounded-md w-full">
            <ThemeCard theme={themes[theme]} name={theme} />
            <div class="m-3">
              <p class="text-2xl text-white">
                Requested by: {themes[theme].email}
              </p>
              <p class="text-2xl text-white">Theme: {theme}</p>
              <div class="flex mt-2">
                <button
                  onClick={() => handleApprove(theme, themes[theme])}
                  class="bg-green-500 p-2 rounded-md mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(theme)}
                  class="bg-red-500 p-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

export default ThemeRequestList
