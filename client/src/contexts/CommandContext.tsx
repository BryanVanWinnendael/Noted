import { CommandTypeContext } from "types"
import { createContext, useContext, useState } from "react"

const CommandsContext = createContext<CommandTypeContext>({} as CommandTypeContext)

export function useCommands(){
  return useContext(CommandsContext)
}

type Props = {
  children: React.ReactNode
}

export const CommandsProvider:React.FC<Props> =  ({ children }: Props) => {
  const [commandsOpen, setCommandsOpen] = useState<boolean>(false)


  const value: CommandTypeContext = {
    commandsOpen,
    setCommandsOpen
  }


  return (
    <CommandsContext.Provider value={value}>
      {children}
    </CommandsContext.Provider>
  )
}

