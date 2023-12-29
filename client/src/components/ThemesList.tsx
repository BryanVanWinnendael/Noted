import type { ThemeType } from "@lib/types"
import { For } from "solid-js"
import ThemeCard from "./ThemeCard"

const Themes = ({ themes }: { themes: { [key: string]: ThemeType } }) => {
  return (
    <div>
      <For each={themes && Object.keys(themes)}>
        {(theme) => <ThemeCard theme={themes[theme]} name={theme} />}
      </For>
    </div>
  )
}

export default Themes
