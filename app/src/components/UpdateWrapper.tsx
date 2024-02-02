import { useToast } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { useCallback, useEffect } from "react"
import { TOAST_ID } from "utils/constants"
import UpdateToast from "./UpdateToast"
import { MyWindow } from "types/index"

declare let window: MyWindow

const UpdateWrapper = ({ children }: { children: JSX.Element }) => {
  const toast = useToast()
  const { handleAutoUpdate } = useSettings()

  const handleElectronMessages = useCallback(() => {
    window.electron?.ipcRenderer.on("loaded", (args: any) => {
      switch (args) {
        case "update downloaded":
          if (toast.isActive(TOAST_ID)) return
          toast({
            id: TOAST_ID,
            duration: null,
            isClosable: true,
            render: () => <UpdateToast />,
          })
          break
        default:
          break
      }
    })
  }, [toast])

  useEffect(() => {
    handleElectronMessages()
    handleAutoUpdate()
  }, [handleAutoUpdate, handleElectronMessages])

  return children
}

export default UpdateWrapper
