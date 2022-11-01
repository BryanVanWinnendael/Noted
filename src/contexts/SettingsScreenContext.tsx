import { useDisclosure } from "@chakra-ui/react"
import { createContext, useContext } from "react"
// @ts-ignore
import { ScreenTypeContext } from "tpes"

const ScreenContext = createContext<any>(null)

export function useScreen(){
  return useContext(ScreenContext)
}

type Props = {
  children: React.ReactNode
}

export const ScreenProvider:React.FC<Props> =  ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const value = {
    isOpen,
    onOpen,
    onClose
  }

  return (
    <ScreenContext.Provider value={value}>
      {children}
    </ScreenContext.Provider>
  )
}

