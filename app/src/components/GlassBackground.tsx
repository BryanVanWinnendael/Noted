import { useSettings } from "contexts/SettingsContext"
import { useEffect } from "react"
import { MyWindow } from "types/index"

declare let window: MyWindow
const ipcRenderer = window.myApp.getIpcRenderer()

const GlassBackground = () => {
  const { glassBackground, glassEnabled } = useSettings()

  useEffect(() => {
    if (glassBackground.window && glassEnabled) {
      window.electron?.ipcRenderer.on("wallpaper", (arg: any) => {
        const background = document.querySelector(
          "#background",
        ) as HTMLImageElement
        if (!background) return
        background.src = `file://${arg.wallpaper}`
        background.width = arg.width + 20
        background.height = arg.height + 70
        background.style.top = `${arg.top <= 30 ? "" : "-"}${Math.abs(
          arg.top - 30,
        )}px`
        background.style.left = `${arg.left < 0 ? "" : "-"}${Math.abs(
          arg.left,
        )}px`
      })
      ipcRenderer.send("asynchronous-message", "ping")
    }
  }, [glassBackground.window, glassEnabled])

  return <img id="background" alt="" />
}

export default GlassBackground
